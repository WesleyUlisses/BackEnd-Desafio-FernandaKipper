"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const disaster_services_1 = require("../disaster/services/disaster.services");
const twilio_1 = __importDefault(require("twilio"));
// Mock do twilio
jest.mock('twilio', () => {
    const sendMessage = jest.fn(() => Promise.resolve({ sid: '12345' }));
    return {
        Twilio: jest.fn(() => ({
            messages: {
                create: sendMessage,
            },
        })),
    };
});
describe('DisasterServices', () => {
    let service;
    let mockedTwilio;
    beforeEach(() => {
        service = new disaster_services_1.DesasterServices();
        mockedTwilio = twilio_1.default;
    });
    it('deve enviar uma mensagem de alerta de desastre', async () => {
        await service['alertDesaster']();
        expect(mockedTwilio.Twilio).toHaveBeenCalled();
        expect(new mockedTwilio.Twilio().messages.create).toHaveBeenCalledWith({
            from: `whatsapp:${process.env.TWILIONUMBER}`,
            to: `whatsapp:${process.env.PERSONALNUMBER}`,
            body: 'Alerta de desastre: Tome as precauções necessárias!',
        });
    });
});
