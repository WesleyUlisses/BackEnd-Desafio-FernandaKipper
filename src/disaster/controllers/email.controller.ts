import { Request, Response } from "express";
import { EmailUtils } from "../../utils/email.utils";
import { ISendEmail } from "../interfaces/email.interfaces";

class EmailController {
  private emailUtils: EmailUtils;

  constructor() {
    this.emailUtils = new EmailUtils();
  }

  public async sendEmail(req: Request, res: Response): Promise<Response> {
    const { destination, subject, content, html }: ISendEmail = req.body;

    if (!destination || !subject || !content) {
      return res.status(400).json({
        message: "Os campos 'destination', 'subject' e 'content' são obrigatórios.",
      });
    }
      const result = await this.emailUtils.sendEmail({ destination, subject, content, html });
      return res.status(200).json({ message: result });
    
  }
}

export {EmailController}