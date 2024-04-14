import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerFilterDto } from './dto/customer-filter.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const existing = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    if (existing) {
      throw new ConflictException('العميل موجود بالفعل بهذا البريد الإلكتروني');
    }
    return this.customerRepository.save(createCustomerDto as any);
  }

  async findAll(filters?: CustomerFilterDto): Promise<Customer[]> {
    const options: any = { order: { createdAt: 'DESC' } };
    if (filters?.skip !== undefined) options.skip = filters.skip;
    if (filters?.take !== undefined) options.take = filters.take;
    return this.customerRepository.find(options);
  }

  async findOne(id: number | string): Promise<Customer | null> {
    const customer = await this.customerRepository.findOne({ where: { id: id as any } });
    return customer ?? null;
  }

  async update(id: number | string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.customerRepository.update(id as any, updateCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number | string): Promise<void> {
    await this.customerRepository.delete(id as any);
  }

  async getStats() {
    const total = await this.customerRepository.count();
    return { total };
  }
}
