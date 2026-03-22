import { TransactionController } from './transaction.controller';
import * as crypto from 'crypto';

describe('TransactionController', () => {
  let controller: TransactionController;

  const serviceMock = {
    create: jest.fn(),
    updateStatus: jest.fn(),
  };
  jest.mock('crypto', () => ({
  subtle: {
    digest: jest.fn().mockResolvedValue(
      new Uint8Array([1, 2, 3]).buffer
    ),
  },
}));

  beforeEach(() => {
    controller = new TransactionController(serviceMock as any);
    jest.clearAllMocks();
  });


  it('should create transaction', async () => {
    const dto = {
      productId: 1,
      amount: 1000,
      customerEmail: 'test@test.com',
    };

    serviceMock.create.mockResolvedValue({ id: 1 });

    const result = await controller.create(dto as any);

    expect(serviceMock.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1 });
  });

  it('should update transaction status', () => {
    serviceMock.updateStatus.mockReturnValue('ok');

    const result = controller.updateStatus(1, 'SUCCESS' as any);

    expect(serviceMock.updateStatus).toHaveBeenCalledWith(1, 'SUCCESS');
    expect(result).toBe('ok');
  });

it('should generate signature', async () => {
  const result = await controller.getSignature('ref123', 1000);

  expect(result).toHaveProperty('signature');
  expect(result).toHaveProperty('expirationTime');
});

});