import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  const serviceMock = {
    createTransaction: jest.fn(),
    getTransaction: jest.fn(),
    getAcceptanceTokens: jest.fn(),
  };

  beforeEach(() => {
    controller = new PaymentsController(serviceMock as any);
    jest.clearAllMocks();
  });


  it('should create payment', async () => {
    const body = {
      amount: 1000,
      email: 'test@test.com',
    };
    serviceMock.createTransaction.mockResolvedValue({ id: 'tx_123' });
    const result = await controller.createPayment(body);
    expect(serviceMock.createTransaction).toHaveBeenCalledWith(body);
    expect(result).toEqual({ id: 'tx_123' });
  });


  it('should get transaction by id', async () => {
    serviceMock.getTransaction.mockResolvedValue({ id: 'tx_123' });
    const result = await controller.getTransaction('tx_123');
    expect(serviceMock.getTransaction).toHaveBeenCalledWith('tx_123');
    expect(result).toEqual({ id: 'tx_123' });
  });

  it('should get acceptance tokens', async () => {
    serviceMock.getAcceptanceTokens.mockResolvedValue({
      acceptanceToken: 'acc',
      personalAuthToken: 'auth',
    });
    const result = await controller.getTokens();
    expect(serviceMock.getAcceptanceTokens).toHaveBeenCalled();
    expect(result).toEqual({
      acceptanceToken: 'acc',
      personalAuthToken: 'auth',
    });
  });
});