import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Customer } from "./entities/customer.entity"
import type { CreateCustomerDto } from "./dto/create-customer.dto"
import type { UpdateCustomerDto } from "./dto/update-customer.dto"
import type { CustomerFilterDto } from "./dto/customer-filter.dto"

@Injectable()
export class CustomersService {
  constructor(private customerRepository: Repository<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Check if email already exists
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    })

    if (existingCustomer) {
      throw new ConflictException("العميل موجود بالفعل بهذا البريد الإلكتروني")
    }

    const customer = this.customerRepository.create(createCustomerDto)
    return this.customerRepository.save(customer)
  }

  async findAll(filters?: CustomerFilterDto) {
    const query = this.customerRepository.createQueryBuilder("customer").orderBy("customer.createdAt", "DESC")

    if (filters) {
      if (filters.search) {
        query.andWhere(
          "(customer.firstName ILIKE :search OR customer.lastName ILIKE :search OR customer.email ILIKE :search OR customer.phone ILIKE :search)",
          { search: `%${filters.search}%` },
        )
      }

      if (filters.status) {
        query.andWhere("customer.status = :status", { status: filters.status })
      }

      if (filters.city) {
        query.andWhere("customer.city ILIKE :city", { city: `%${filters.city}%` })
      }
    }

    return query.getMany()
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ["sales"],
    })

    if (!customer) {
      throw new NotFoundException("العميل غير موجود")
    }

    return customer
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id)

    // Check if email is being changed and if it already exists
    if (updateCustomerDto.email && updateCustomerDto.email !== customer.email) {
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: updateCustomerDto.email },
      })

      if (existingCustomer) {
        throw new ConflictException("البريد الإلكتروني مستخدم بالفعل")
      }
    }

    Object.assign(customer, updateCustomerDto)
    return this.customerRepository.save(customer)
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id)
    await this.customerRepository.remove(customer)
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { email } })
  }

  async getCustomerStats(id: number) {
    const customer = await this.findOne(id)

    // Get customer statistics
    const stats = await this.customerRepository
      .createQueryBuilder("customer")
      .leftJoin("customer.sales", "sale")
      .select([
        "COUNT(sale.id) as totalSales",
        "COALESCE(SUM(sale.totalAmount), 0) as totalSpent",
        "MAX(sale.createdAt) as lastPurchase",
      ])
      .where("customer.id = :id", { id })
      .getRawOne()

    return {
      customer,
      stats: {
        totalSales: Number.parseInt(stats.totalSales) || 0,
        totalSpent: Number.parseFloat(stats.totalSpent) || 0,
        lastPurchase: stats.lastPurchase,
      },
    }
  }
}
