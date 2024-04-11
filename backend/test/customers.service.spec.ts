import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from '../src/customers/customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../src/customers/entities/customer.entity';
import { Repository } from 'typeorm';

describe('CustomersService', () => {
  let service: CustomersService;
  let customersRepository: Repository<Customer>;

  const mockCustomer = {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    licenseNumber: 'SA123456789',
    licenseExpiry: new Date('2025-12-31'),
    drivingExperience: 5,
    rating: 4.5,
    totalTransactions: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    customersRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of customers', async () => {
      jest.spyOn(customersRepository, 'find').mockResolvedValue([mockCustomer as any]);

      const result = await service.findAll();

      expect(result).toEqual([mockCustomer]);
      expect(customersRepository.find).toHaveBeenCalled();
    });

    it('should support pagination', async () => {
      jest.spyOn(customersRepository, 'find').mockResolvedValue([mockCustomer as any]);

      await service.findAll({ skip: 0, take: 10 });

      expect(customersRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a customer by id', async () => {
      jest.spyOn(customersRepository, 'findOne').mockResolvedValue(mockCustomer as any);

      const result = await service.findOne('1');

      expect(result).toEqual(mockCustomer);
    });

    it('should return null if customer not found', async () => {
      jest.spyOn(customersRepository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto = {
        firstName: 'Ahmed',
        lastName: 'Hassan',
        email: 'ahmed@example.com',
        phone: '+966501234567',
      };

      jest.spyOn(customersRepository, 'save').mockResolvedValue(mockCustomer as any);

      const result = await service.create(createCustomerDto as any);

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update customer rating', async () => {
      const updateDto = { rating: 4.8 };

      jest.spyOn(customersRepository, 'update').mockResolvedValue({ affected: 1 } as any);

      await service.update('1', updateDto as any);

      expect(customersRepository.update).toHaveBeenCalled();
    });
  });

  describe('getCustomerStats', () => {
    it('should return customer statistics', async () => {
      jest.spyOn(customersRepository, 'count').mockResolvedValue(100);

      const result = await service.getStats();

      expect(result).toBeDefined();
      expect(customersRepository.count).toHaveBeenCalled();
    });
  });
});
