import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction, TransactionStatus } from './transaction.entity';
import { Product } from '../product/product.entity';

describe('TransactionService', () => {
  let service: TransactionService;

  const mockTransactionRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockProductRepo = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepo,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // 👈 importante
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create transaction successfully', async () => {
    mockProductRepo.findOneBy.mockResolvedValue({ id: 1, stock: 5 });

    mockTransactionRepo.create.mockReturnValue({
      productId: 1,
      amount: 100,
      customerEmail: 'test@mail.com',
      status: 'PENDING',
    });

    mockTransactionRepo.save.mockResolvedValue({
      id: 1,
      status: 'SUCCESS',
    });

    const result = await service.create({
      productId: 1,
      amount: 100,
      customerEmail: 'test@mail.com',
    });

    expect(result).toBeDefined();
  });

  it('should throw error if product not found', async () => {
    mockProductRepo.findOneBy.mockResolvedValue(null);

    await expect(
      service.create({
        productId: 1,
        amount: 100,
        customerEmail: 'test@mail.com',
      }),
    ).rejects.toThrow('Product not found');
  });

  it('should throw error if no stock', async () => {
    mockProductRepo.findOneBy.mockResolvedValue({ stock: 0 });

    await expect(
      service.create({
        productId: 1,
        amount: 100,
        customerEmail: 'test@mail.com',
      }),
    ).rejects.toThrow('No stock available');
  });

  it('should update status to SUCCESS and reduce stock', async () => {
    const transaction = { id: 1, productId: 1, status: TransactionStatus.PENDING };
    const product = { id: 1, stock: 5 };

    mockTransactionRepo.findOneBy.mockResolvedValue(transaction);
    mockProductRepo.findOneBy.mockResolvedValue(product);

    mockTransactionRepo.save.mockResolvedValue({
      ...transaction,
      status: TransactionStatus.SUCCESS,
    });

    const result = await service.updateStatus(1, TransactionStatus.SUCCESS);

    expect(result.status).toBe(TransactionStatus.SUCCESS);
  });

  it('should throw error if transaction not found', async () => {
    mockTransactionRepo.findOneBy.mockResolvedValue(null);

    await expect(
      service.updateStatus(1, TransactionStatus.SUCCESS),
    ).rejects.toThrow('Transaction not found');
  });
});