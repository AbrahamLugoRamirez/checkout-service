import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  const repoMock = {
    find: jest.fn(),
    count: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(() => {
    service = new ProductService(repoMock as any);
    jest.clearAllMocks();
  });

  // ✅ findAll
  it('should return all products', async () => {
    const mockProducts = [
      { id: 1, name: 'iPhone', price: 1000 },
    ];

    repoMock.find.mockResolvedValue(mockProducts);

    const result = await service.findAll();

    expect(result).toEqual(mockProducts);
    expect(repoMock.find).toHaveBeenCalled();
  });

  // ✅ seed cuando NO hay datos
  it('should seed products if table is empty', async () => {
    repoMock.count.mockResolvedValue(0);
    repoMock.save.mockResolvedValue([]);

    const result = await service.seed();

    expect(repoMock.count).toHaveBeenCalled();
    expect(repoMock.save).toHaveBeenCalled();

    expect(result).toEqual({
      message: 'Seed ejecutado correctamente',
    });

    // opcional: validar que guarda 3 productos
    expect(repoMock.save.mock.calls[0][0].length).toBe(3);
  });

  // ✅ seed cuando YA hay datos
  it('should NOT seed if products already exist', async () => {
    repoMock.count.mockResolvedValue(5);

    const result = await service.seed();

    expect(repoMock.count).toHaveBeenCalled();
    expect(repoMock.save).not.toHaveBeenCalled();

    expect(result).toEqual({
      message: 'Seed ejecutado correctamente',
    });
  });
});