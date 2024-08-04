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
  private emailDals: EmailUtils;

  constructor() {
    this.cityDals = new CityDals();
    this.adressDals = new AdressDals();
    this.userDals = new UserDals();
    this.emailDals = new EmailUtils();
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
    

    if (findCity) {
      const findAdress = await this.adressDals.findAddressesByCity(
        findCity.name,
        findCity.state
      );

      const userPromises = findAdress.map(async (address) => {
      const user = await this.userDals.findUserById(address.userId);
      return user ? user : null;
    });

    const users = await Promise.all(userPromises);
    
    // Enviar alerta via WhatsApp e email
    for (const user of users) {
      if (!user) {
        throw new NotFoundError({ message: 'user not found' });
      }
      
      const whatsappNumber = user.phone;
      const email = user.email;
      
      if (whatsappNumber) {
        await this.alertDesaster(whatsappNumber, "Alerta de desastre: Tome as precauções necessárias!");
      }
      
      if (email) {
        await this.emailDals.sendEmail({
          destination: email,
          subject: "Alerta de Desastre",
          content: "Estamos notificando sobre um possível desastre na sua área. Por favor, tome as precauções necessárias."
        });
      }
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
      body: text,
    });

    console.log("Mensagem enviada com sucesso:", message.sid);
  }
}

export { DesasterServices };
