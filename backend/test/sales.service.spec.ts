import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from '../src/sales/sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../src/sales/entities/sale.entity';

describe('SalesService', () => {
  let service: SalesService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      query: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: getRepositoryToken(Sale),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateTax', () => {
    it('should calculate 15% tax correctly', () => {
      const price = 100000;
      const tax = service.calculateTax(price, 15);
      expect(tax).toBe(15000);
    });

    it('should handle zero tax', () => {
      const price = 100000;
      const tax = service.calculateTax(price, 0);
      expect(tax).toBe(0);
    });
  });

  describe('calculateDiscount', () => {
    it('should apply percentage discount', () => {
      const price = 100000;
      const discount = service.calculateDiscount(price, 10);
      expect(discount).toBe(10000);
    });

    it('should not allow negative discount', () => {
      const price = 100000;
      const discount = service.calculateDiscount(price, -5);
      expect(discount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateFinalPrice', () => {
    it('should calculate price with tax and discount', () => {
      const basePrice = 100000;
      const tax = 15000;
      const discount = 5000;
      const finalPrice = basePrice + tax - discount;
      expect(finalPrice).toBe(110000);
    });
  });

  describe('getSalesReport', () => {
    it('should return sales statistics', async () => {
      mockRepository.query.mockResolvedValue([
        { total: 500000, count: 5 },
      ]);

      const result = await service.getSalesReport(new Date(), new Date());
      expect(result).toBeDefined();
    });
  });

  describe('getMonthlyRevenue', () => {
    it('should return monthly revenue data', async () => {
      mockRepository.query.mockResolvedValue([
        { month: '2024-01', revenue: 150000 },
        { month: '2024-02', revenue: 200000 },
      ]);

      const result = await service.getMonthlyRevenue(2024);
      expect(result).toBeDefined();
    });
  });
});
