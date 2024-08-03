import cron from 'node-cron';
import twilio from 'twilio';

class DesasterServices {
    private client: twilio.Twilio;
    private fromWhatsAppNumber: string;
   

    constructor() {
        // Configurar o cliente Twilio
        this.client = twilio(process.env.ACOUNTSID, process.env.AUTHTOKEN);
        
        // Defina o número WhatsApp do Twilio e o número de destino
        this.fromWhatsAppNumber = `whatsapp:${process.env.TWILIONUMBER}`; // Número do Twilio (Sandbox)
        
    }

    // Método para agendar o alerta de desastre
    /*private scheduleAlert() {
        cron.schedule('*//*5 * * * * *', () => {
            this.alertDesaster();
        });
    }*/

        async detectedDesaster(){
           return this.alertDesaster();
        }


    // Método que emite o alerta de desastre
    private async alertDesaster() {
        console.log('Alerta de desastre: Enviando mensagem via WhatsApp para o numero indicado...');

      
            const message = await this.client.messages.create({
                from: this.fromWhatsAppNumber,
                to: `whatsapp:${process.env.PERSONALNUMBER}`,
                body: 'Alerta de desastre: Tome as precauções necessárias!'
            });
 
            console.log('Mensagem enviada com sucesso:', message.sid);
       
    }
}

export { DesasterServices };
