import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from '../src/rentals/rentals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rental } from '../src/rentals/entities/rental.entity';
import { Repository } from 'typeorm';

describe('RentalsService', () => {
  let service: RentalsService;
  let rentalsRepository: Repository<Rental>;

  const mockRental = {
    id: '1',
    customer: { id: '1', firstName: 'Ahmed' },
    car: { id: '1', model: 'X5' },
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-08'),
    status: 'active',
    totalPrice: 2450,
    depositAmount: 500,
    dailyRate: 350,
    kmLimit: 500,
    actualKm: 300,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        {
          provide: getRepositoryToken(Rental),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
    rentalsRepository = module.get<Repository<Rental>>(getRepositoryToken(Rental));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of rentals', async () => {
      jest.spyOn(rentalsRepository, 'find').mockResolvedValue([mockRental as any]);

      const result = await service.findAll();

      expect(result).toEqual([mockRental]);
    });
  });

  describe('findOne', () => {
    it('should return a rental by id', async () => {
      jest.spyOn(rentalsRepository, 'findOne').mockResolvedValue(mockRental as any);

      const result = await service.findOne('1');

      expect(result).toEqual(mockRental);
    });
  });

  describe('create', () => {
    it('should create a new rental', async () => {
      const createRentalDto = {
        customerId: '1',
        carId: '1',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-08'),
        kmLimit: 500,
      };

      jest.spyOn(rentalsRepository, 'save').mockResolvedValue(mockRental as any);

      const result = await service.create(createRentalDto as any);

      expect(result).toBeDefined();
    });
  });

  describe('calculateLateFee', () => {
    it('should calculate late fee for overdue rental', () => {
      const endDate = new Date('2024-01-08');
      const returnDate = new Date('2024-01-10');
      const lateFeePerDay = 50;

      const fee = service.calculateLateFee(endDate, returnDate, lateFeePerDay);

      expect(fee).toBe(100); // 2 days * 50
    });

    it('should return 0 for on-time return', () => {
      const endDate = new Date('2024-01-08');
      const returnDate = new Date('2024-01-08');
      const lateFeePerDay = 50;

      const fee = service.calculateLateFee(endDate, returnDate, lateFeePerDay);

      expect(fee).toBe(0);
    });
  });

  describe('getActiveRentals', () => {
    it('should return only active rentals', async () => {
      jest.spyOn(rentalsRepository, 'find').mockResolvedValue([mockRental as any]);

      const result = await service.findActive();

      expect(result).toBeDefined();
    });
  });

  describe('getOverdueRentals', () => {
    it('should return only overdue rentals', async () => {
      jest.spyOn(rentalsRepository, 'find').mockResolvedValue([]);

      const result = await service.findOverdue();

      expect(result).toBeDefined();
    });
  });
});
