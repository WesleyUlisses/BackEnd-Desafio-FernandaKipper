import { UserDals } from "../database/repositories/user.repositories/user.dals";
import { AdressDals } from "../database/repositories/user.repositories/adress.dals";
import { IUserData } from "../interfaces/user.interfaces";
import { BadRequestError } from "../../helpers/error.helpers";
import axios  from "axios";
import { CityDals } from "../database/repositories/user.repositories/city.dals";

class UserServices {
  private userDals: UserDals;
  private adressDals: AdressDals;
  private cityDals: CityDals;

  constructor() {
    this.userDals = new UserDals();
    this.adressDals = new AdressDals();
    this.cityDals = new CityDals();
  }

  async createUser({
    name,
    whatsapp,
    phone,
    email,
    city,
    state,
    cep,
    neighborhood,
    latitude,
    longitude,
  }: IUserData) {
    const user = await this.userDals.createUser({
      name,
      whatsapp,
      phone,
      email,
    });
    if (!user) {
      throw new BadRequestError({ message: "user not created" });
    }
    const findCity = await this.cityDals.doesCityExist(city, state);
    if(!findCity){
        const trigger = await this.registerTrigger(Number(latitude), Number(longitude) );
        console.log(trigger)
    }
    const address = await this.adressDals.createAdress({
      cityName: city,
      state: state,
      userId: user.id,
      cep: cep,
      neighborhood: neighborhood,
      latitude: latitude,
      longitude,
    });
    if (!address) {
      throw new BadRequestError({ message: "adress not created" });
    }

    
    
    return {
      user: user,
      address: address,
      message: "User and address created successfully",
    };
  }

  private async registerTrigger(latitude: number, longitude: number) {
    const apiKey = process.env.APIKEY;
    const url = `http://api.openweathermap.org/data/3.0/triggers?appid=${apiKey}`;
    const requestBody = {
      time_period: {
        start: {
          expression: "after",
          amount: 10,
        },
        end: {
          expression: "after",
          amount: 432000000,
        },
      },
      conditions: [
        {
          name: "temp",
          expression: "$gt",
          amount: 280,
        },
      ],
      area: [
        {
          type: "Point",
          coordinates: [latitude, longitude],
        },
      ],
    };

    const response = axios
      .post(url, requestBody)
      .then((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        return error;
      });

      return response
  }
}

export { UserServices };
