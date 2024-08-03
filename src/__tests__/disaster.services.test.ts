import { DesasterServices } from '../disaster/services/disaster.services';
import twilio from 'twilio';

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
  let service: DesasterServices;
  let mockedTwilio: jest.Mocked<typeof twilio>;

  beforeEach(() => {
    service = new DesasterServices();
    mockedTwilio = twilio as jest.Mocked<typeof twilio>;
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
