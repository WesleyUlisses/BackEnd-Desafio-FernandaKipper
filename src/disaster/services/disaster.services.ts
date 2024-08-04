import cron from "node-cron";
import twilio from "twilio";
import { CityDals } from "../database/repositories/user.repositories/city.dals";
import { AdressDals } from "../database/repositories/user.repositories/adress.dals";
import { UserDals } from "../database/repositories/user.repositories/user.dals";
import { BadRequestError, NotFoundError } from "../../helpers/error.helpers";
import { EmailUtils } from "../../utils/email.utils";
class DesasterServices {
  private client: twilio.Twilio;
  private fromWhatsAppNumber: string;
  private cityDals: CityDals;
  private adressDals: AdressDals;
  private userDals: UserDals;
  private emailUtils: EmailUtils;

  constructor() {
    this.cityDals = new CityDals();
    this.adressDals = new AdressDals();
    this.userDals = new UserDals();
     this.emailUtils = new EmailUtils();
    // Configurar o cliente Twilio
    this.client = twilio(process.env.ACOUNTSID, process.env.AUTHTOKEN);

    // Defina o número WhatsApp do Twilio e o número de destino
    this.fromWhatsAppNumber = `whatsapp:${process.env.TWILIONUMBER}`; // Número do Twilio (Sandbox)
    this.scheduleAlert();
  }

  // Método para agendar o alerta de desastre
  private scheduleAlert() {
    cron.schedule("*/5 * * * * *", () => {
      this.detectedDesaster();
    });
  }

  async detectedDesaster() {
    const cities = [
      { latitude: -13.851, longitude: 40.0812 },
      { latitude: -12.9704, longitude: -38.5124 },
    ];
    const risks = ["moderado", "alto", "imediata"];
    // Seleciona um valor aleatório de cada array
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    console.log(randomCity);
    const findCity = await this.cityDals.findCityByCoordinates(
      String(randomCity.latitude),
      String(randomCity.longitude)
    );
    console.log(findCity)
    if (findCity) {
      const findAdress = await this.adressDals.findAddressesByCity(
        findCity.name,
        findCity.state
      );

      // Se encontrar os endereços, mapeie o array para extrair os userIds
     // Recupere os IDs dos usuários e seus números de WhatsApp
    const userPromises = findAdress.map(async (address) => {
      const user = await this.userDals.findUserById(address.userId);
      return user;
    });

    const users = await Promise.all(userPromises);
    

    for (const user of users) {
      if(!user){
        throw new NotFoundError({message: 'user not found'})
      }
      console.log(user)
      await this.alertDesaster(user.phone, "Alerta de desastre: Tome as precauções necessárias!");
      await this.emailUtils.sendEmail({destination: user.email, subject: "Risco", content: "Alerta de desastre: Tome as precauções necessárias!"})
    }
      // Agora você pode fazer algo com os userIds, como enviar alertas, etc.
    }

    // return this.alertDesaster();
  }

  private async alertDesaster(number: string, text: string) {
    console.log(
      "Alerta de desastre: Enviando mensagem via WhatsApp para o numero indicado..."
    );

    const message = await this.client.messages.create({
      from:`whatsapp:${process.env.TWILIONUMBER}`,
      to: `whatsapp:${number}`,
      body: "mensagem",
    });

    console.log("Mensagem enviada com sucesso:", message.sid);
  }
}

export { DesasterServices };