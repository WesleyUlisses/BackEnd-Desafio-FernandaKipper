import { UserDals } from "../database/repositories/user.repositories/user.dals";
import { AdressDals } from "../database/repositories/user.repositories/adress.dals";
import { IUserRegistrationData } from "../interfaces/user.interfaces";
import { BadRequestError } from "../../helpers/error.helpers";
import axios from "axios";
import { CityDals } from "../database/repositories/user.repositories/city.dals";
import { EmailUtils } from "../../utils/email.utils";

class UserServices {
  private userDals: UserDals;
  private adressDals: AdressDals;
  private cityDals: CityDals;
  private emailUtils: EmailUtils;
  constructor() {
    this.userDals = new UserDals();
    this.adressDals = new AdressDals();
    this.cityDals = new CityDals();
    this.emailUtils = new EmailUtils();
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
    const message = `Olá, ${user.name} Seja bem-vindo ao nosso Sistema de Alerta e Evacuação. A sua segurança é a nossa prioridade, e estamos aqui para ajudar a mantê-lo informado e preparado para quaisquer emergências relacionadas a enchentes, queimadas e outros desastres naturais. Aqui estão alguns dos recursos que você agora tem à disposição: Monitoramento em Tempo Real: Receba alertas personalizados sobre os riscos na sua área. Apoio Psicológico: Acesso a suporte psicológico online, caso você ou sua família precisem de ajuda. Informações Detalhadas: Mantenha-se informado com artigos e orientações sobre como agir em situações de emergência. Para começar, recomendamos que você complete seu perfil, incluindo detalhes importantes como seu endereço e contatos adicionais. Isso nos ajudará a fornecer alertas mais precisos e relevantes. Se você tiver alguma dúvida ou precisar de assistência, não hesite em nos contatar. Estamos aqui para ajudar você a se manter seguro! Atenciosamente, Equipe de Suporte ao Usuário Sistema de Alerta e Evacuação`

    await this.emailUtils.sendEmail({destination: user.email, subject: "Boas vindas novo usuário", content: message});

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
