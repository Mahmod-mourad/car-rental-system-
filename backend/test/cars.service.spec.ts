import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from '../src/cars/cars.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from '../src/cars/entities/car.entity';
import { Brand } from '../src/cars/entities/brand.entity';
import { Category } from '../src/cars/entities/category.entity';
import { Repository } from 'typeorm';

describe('CarsService', () => {
  let service: CarsService;
  let carsRepository: Repository<Car>;
  let brandsRepository: Repository<Brand>;
  let categoriesRepository: Repository<Category>;

  const mockCar = {
    id: '1',
    brand: { id: '1', name: 'BMW' },
    model: 'X5',
    year: 2024,
    color: 'Black',
    price: 320000,
    dailyRentalPrice: 350,
    status: 'available',
    condition: 'new',
    availability: 'for_sale_and_rental',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getRepositoryToken(Car),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Brand),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
    carsRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
    brandsRepository = module.get<Repository<Brand>>(getRepositoryToken(Brand));
    categoriesRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cars', async () => {
      jest.spyOn(carsRepository, 'find').mockResolvedValue([mockCar as any]);

      const result = await service.findAll();

      expect(result).toEqual([mockCar]);
      expect(carsRepository.find).toHaveBeenCalled();
    });

    it('should filter cars by status', async () => {
      jest.spyOn(carsRepository, 'find').mockResolvedValue([mockCar as any]);

      const result = await service.findAll({ status: 'available' });

      expect(result).toBeDefined();
      expect(carsRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single car by id', async () => {
      jest.spyOn(carsRepository, 'findOne').mockResolvedValue(mockCar as any);

      const result = await service.findOne('1');

      expect(result).toEqual(mockCar);
      expect(carsRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null if car not found', async () => {
      jest.spyOn(carsRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new car', async () => {
      const createCarDto = {
        brandId: '1',
        model: 'X5',
        year: 2024,
        color: 'Black',
        price: 320000,
        dailyRentalPrice: 350,
        condition: 'new',
        availability: 'for_sale_and_rental',
      };

      jest.spyOn(carsRepository, 'save').mockResolvedValue(mockCar as any);

      const result = await service.create(createCarDto as any);

      expect(result).toBeDefined();
      expect(carsRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a car', async () => {
      const updateCarDto = { color: 'White' };

      jest.spyOn(carsRepository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(carsRepository, 'findOne').mockResolvedValue(mockCar as any);

      await service.update('1', updateCarDto as any);

      expect(carsRepository.update).toHaveBeenCalledWith('1', expect.any(Object));
    });
  });

  describe('remove', () => {
    it('should soft delete a car', async () => {
      jest.spyOn(carsRepository, 'update').mockResolvedValue({ affected: 1 } as any);

      await service.remove('1');

      expect(carsRepository.update).toHaveBeenCalled();
    });
  });
});
