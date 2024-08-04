import * as nodemailer from "nodemailer";
import { ISendEmail } from "../disaster/interfaces/email.interfaces";
import { SESV2 } from "aws-sdk";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

class EmailUtils {
  private awsAccessInformation = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    version: process.env.AWS_API_VERSION,
  };

  constructor(private client = new SESClient({
    region: process.env.AWS_REGION || "us-east-2" as string,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  })) {}

  async sendEmail({ destination, subject, content, html }: ISendEmail) {
    console.log("AWS_ACCESS_KEY:", process.env.AWS_ACCESS_KEY);
    console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
    console.log("AWS_REGION:", process.env.AWS_REGION);
    console.log("AWS_API_VERSION:", process.env.AWS_API_VERSION);

    if(!html){
      html = content;
    }
    
    const input = {
      Source: "apoioecocrise@labsif.com.br", // Endereço de email verificado na SES
      Destination: {
        ToAddresses: [
          destination, // Endereço de email do destinatário
        ],
      },
      Message: {
        Subject: {
          Data: subject, // Assunto do email
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: content, // Corpo do email em texto simples
            Charset: "UTF-8",
          },
          Html: {
            Data: html, // Corpo do email em HTML
            Charset: "UTF-8",
          },
        },
      },
    };

    const command = new SendEmailCommand(input);

    try {
      const response = await this.client.send(command);
      console.log("Email enviado com sucesso. MessageId:", response.MessageId);
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }

    return "E-mail enviado com sucesso!";

  }
}

export { EmailUtils };
