import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { CarsService } from '../cars/cars.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemRepository: Repository<SaleItem>,
    private carsService: CarsService,
    private customersService: CustomersService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const car = await this.carsService.findOne(createSaleDto.carId);
    if (!car) {
      throw new NotFoundException('السيارة غير موجودة');
    }

    const customer = await this.customersService.findOne(createSaleDto.customerId);
    if (!customer) {
      throw new NotFoundException('العميل غير موجود');
    }

    const sale = this.saleRepository.create({
      car,
      customer,
      totalPrice: createSaleDto.totalPrice,
      paymentMethod: createSaleDto.paymentMethod,
      status: 'pending',
      notes: createSaleDto.notes,
    });

    return await this.saleRepository.save(sale);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.saleRepository.findAndCount({
      relations: ['car', 'customer'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['car', 'customer'],
    });

    if (!sale) {
      throw new NotFoundException('البيع غير موجود');
    }

    return sale;
  }

  async getReports(startDate?: Date, endDate?: Date) {
    const query = this.saleRepository.createQueryBuilder('sale');

    if (startDate) {
      query.andWhere('sale.createdAt >= :startDate', { startDate });
    }

    if (endDate) {
      query.andWhere('sale.createdAt <= :endDate', { endDate });
    }

    const sales = await query
      .leftJoinAndSelect('sale.car', 'car')
      .leftJoinAndSelect('sale.customer', 'customer')
      .orderBy('sale.createdAt', 'DESC')
      .getMany();

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const totalSales = sales.length;

    return {
      totalRevenue,
      totalSales,
      averageSale: totalSales > 0 ? totalRevenue / totalSales : 0,
      sales,
    };
  }

  async updateStatus(id: number, status: string) {
    const sale = await this.findOne(id);
    sale.status = status;
    return await this.saleRepository.save(sale);
  }
}
