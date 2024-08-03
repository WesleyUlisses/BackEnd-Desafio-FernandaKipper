"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesasterServices = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const twilio_1 = __importDefault(require("twilio"));
class DesasterServices {
    constructor() {
        // Configurar o cliente Twilio
        this.client = (0, twilio_1.default)(process.env.ACOUNTSID, process.env.AUTHTOKEN);
        // Defina o número WhatsApp do Twilio e o número de destino
        this.fromWhatsAppNumber = `whatsapp:${process.env.TWILIONUMBER}`; // Número do Twilio (Sandbox)
        this.scheduleAlert();
    }
    // Método para agendar o alerta de desastre
    scheduleAlert() {
        node_cron_1.default.schedule('*/5 * * * * *', () => {
            this.alertDesaster();
        });
    }
    // Método que emite o alerta de desastre
    async alertDesaster() {
        console.log('Alerta de desastre: Enviando mensagem via WhatsApp para o numero indicado...');
        const message = await this.client.messages.create({
            from: this.fromWhatsAppNumber,
            to: `whatsapp:${process.env.PERSONALNUMBER}`,
            body: 'Alerta de desastre: Tome as precauções necessárias!'
        });
        console.log('Mensagem enviada com sucesso:', message.sid);
    }
}
exports.DesasterServices = DesasterServices;
