import { Router } from 'express';
import { EmailController } from '../controllers/email.controller';

class EmailRoutes {
  private readonly router: Router;
  private emailController: EmailController;

  constructor() {
    this.router = Router();
    this.emailController = new EmailController();
  }

  postRoutes() {
    /**
     * @swagger
     * components:
     *   schemas:
     *     Email:
     *       type: object
     *       properties:
     *         destination:
     *           type: string
     *           example: recipient@example.com
     *         subject:
     *           type: string
     *           example: "Your subject here"
     *         content:
     *           type: string
     *           example: "Your email content here"
     *         html:
     *           type: string
     *           example: "<h1>Your HTML content here</h1>"
     *
     *   responses:
     *     EmailSent:
     *       description: E-mail enviado com sucesso
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               message:
     *                 type: string
     *                 example: "E-mail enviado com sucesso!"
     *
     * /email/send-email:
     *   post:
     *     summary: Envia um e-mail
     *     tags: [Email]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Email'
     *     responses:
     *       200:
     *         $ref: '#/components/responses/EmailSent'
     *       400:
     *         description: Bad Request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Invalid request"
     */
    this.router.post('/send-email', this.emailController.sendEmail.bind(this.emailController));
    return this.router;
  }
}

export { EmailRoutes };
