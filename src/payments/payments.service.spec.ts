import { PaymentsService } from './payments.service';
import axios from 'axios';

jest.mock('axios');

describe('PaymentsService', () => {
  let service: PaymentsService;

  const transactionServiceMock = {
    create: jest.fn(),
  };

  beforeEach(() => {
    service = new PaymentsService(transactionServiceMock as any);
    jest.clearAllMocks();
  });


  it('should create transaction successfully', async () => {
    jest.spyOn(service, 'createCardToken').mockResolvedValue('token123');

    jest.spyOn(service, 'getAcceptanceTokens').mockResolvedValue({
      acceptanceToken: 'acc_token',
      personalAuthToken: 'auth_token',
    });

    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: { id: 'wompi_tx_123' } },
    });
    transactionServiceMock.create.mockResolvedValue('local_tx_123');
    const result = await service.createTransaction({
      card: {},
      amount: 1000,
      email: 'test@test.com',
      productId: 1,
    });

    expect(result).toHaveProperty('transaction_id');
    expect(result).toHaveProperty('wompi_response');
    expect(transactionServiceMock.create).toHaveBeenCalled();
  });

  it('should throw error when wompi fails', async () => {
    jest.spyOn(service, 'createCardToken').mockResolvedValue('token123');

    jest.spyOn(service, 'getAcceptanceTokens').mockResolvedValue({
      acceptanceToken: 'acc_token',
      personalAuthToken: 'auth_token',
    });
    (axios.post as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(
      service.createTransaction({
        card: {},
        amount: 1000,
        email: 'test@test.com',
        productId: 1,
      }),
    ).rejects.toThrow('Error creando transacción');
  });

  it('should get transaction', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { id: 'tx_123' },
    });
    const result = await service.getTransaction('tx_123');

    expect(result).toEqual({ id: 'tx_123' });
  });


  it('should return acceptance tokens', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: {
          presigned_acceptance: { acceptance_token: 'acc' },
          presigned_personal_data_auth: { acceptance_token: 'auth' },
        },
      },
    });
    const result = await service.getAcceptanceTokens();
    expect(result.acceptanceToken).toBe('acc');
    expect(result.personalAuthToken).toBe('auth');
  });

  it('should throw error if acceptance tokens fail', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(service.getAcceptanceTokens()).rejects.toThrow(
      'Error obteniendo acceptance tokens',
    );
  });


  it('should create card token', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { data: { id: 'token123' } },
    });
    const result = await service.createCardToken({
      number: '4242424242424242',
      exp_month: '12',
      exp_year: '25',
      cvc: '123',
      card_holder: 'Test User',
    });

    expect(result).toBe('token123');
  });


  it('should throw error when card token fails', async () => {
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { error: { messages: [] } } },
    });
    await expect(
      service.createCardToken({
        number: '123',
        exp_month: '12',
        exp_year: '25',
        cvc: '123',
        card_holder: 'Test User',
      }),
    ).rejects.toThrow('Error creando token de tarjeta');
  });
});