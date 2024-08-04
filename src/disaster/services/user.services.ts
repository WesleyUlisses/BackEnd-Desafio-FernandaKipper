import { UserDals } from "../database/repositories/user.repositories/user.dals";
import { AdressDals } from "../database/repositories/user.repositories/adress.dals";
import { IUserRegistrationData } from "../interfaces/user.interfaces";
import { BadRequestError } from "../../helpers/error.helpers";
import axios from "axios";
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
    email,
    phoneNumber,
    address
  }: IUserRegistrationData) {
    const user = await this.userDals.createUser({
      name,
      email,
      phone: phoneNumber
    });
    if (!user) {
      throw new BadRequestError({ message: "User not created" });
    }

    const { city, state, location, cep, neighborhood, street} = address;

    const findCity = await this.cityDals.doesCityExist(city, state);
    if (!findCity) {
      const { coordinates } = location;
      const trigger = await this.registerTrigger(Number(coordinates.latitude), Number(coordinates.longitude));
      console.log(trigger);
    }

    const newAddress = await this.adressDals.createAdress({
      cityName: city,
      state: state,
      userId: user.id,
      cep: cep,
      neighborhood: neighborhood,
      street: street,
      location: location,
    });
    if (!newAddress) {
      throw new BadRequestError({ message: "Address not created" });
    }

    return {
      user: user,
      address: newAddress,
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

    return response;
  }
}

export { UserServices };
