import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  calculateTax(price: number, rate: number): number {
    return price * (rate / 100);
  }

  calculateDiscount(price: number, rate: number): number {
    const safeRate = Math.max(0, rate);
    return price * (safeRate / 100);
  }

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.saleRepository.save(createSaleDto as any) as Promise<Sale>;
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.saleRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' } as any,
    });
    return { data, total, page, limit };
  }

  async findOne(id: number | string): Promise<Sale | null> {
    const sale = await this.saleRepository.findOne({ where: { id: id as any } });
    return sale ?? null;
  }

  async getSalesReport(startDate: Date, endDate: Date) {
    return this.saleRepository.query(
      `SELECT SUM(total_price) as total, COUNT(*) as count
       FROM sales
       WHERE created_at BETWEEN $1 AND $2`,
      [startDate, endDate],
    );
  }

  async getMonthlyRevenue(year: number) {
    return this.saleRepository.query(
      `SELECT TO_CHAR(created_at, 'YYYY-MM') as month, SUM(total_price) as revenue
       FROM sales
       WHERE EXTRACT(YEAR FROM created_at) = $1
       GROUP BY month
       ORDER BY month`,
      [year],
    );
  }

  async updateStatus(id: number | string, status: string): Promise<Sale> {
    await this.saleRepository.update(id as any, { status } as any);
    return this.findOne(id);
  }
}
