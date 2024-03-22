import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { CarsService } from '../cars/cars.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    private carsService: CarsService,
    private customersService: CustomersService,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    const car = await this.carsService.findOne(createRentalDto.carId);
    if (!car) {
      throw new NotFoundException('السيارة غير موجودة');
    }

    const customer = await this.customersService.findOne(createRentalDto.customerId);
    if (!customer) {
      throw new NotFoundException('العميل غير موجود');
    }

    // Check car availability
    const existingRental = await this.rentalRepository.findOne({
      where: {
        car: { id: createRentalDto.carId },
        status: 'active',
      },
    });

    if (existingRental) {
      throw new BadRequestException('السيارة غير متاحة حالياً');
    }

    const rental = this.rentalRepository.create({
      car,
      customer,
      startDate: new Date(createRentalDto.startDate),
      endDate: new Date(createRentalDto.endDate),
      dailyRate: createRentalDto.dailyRate,
      totalPrice: createRentalDto.totalPrice,
      rentalType: createRentalDto.rentalType,
      status: 'active',
    });

    return await this.rentalRepository.save(rental);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.rentalRepository.findAndCount({
      relations: ['car', 'customer'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['car', 'customer'],
    });

    if (!rental) {
      throw new NotFoundException('التأجير غير موجود');
    }

    return rental;
  }

  async getActive() {
    return await this.rentalRepository.find({
      where: { status: 'active' },
      relations: ['car', 'customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async getOverdue() {
    const now = new Date();
    return await this.rentalRepository
      .createQueryBuilder('rental')
      .leftJoinAndSelect('rental.car', 'car')
      .leftJoinAndSelect('rental.customer', 'customer')
      .where('rental.endDate < :now', { now })
      .andWhere('rental.status = :status', { status: 'active' })
      .orderBy('rental.endDate', 'ASC')
      .getMany();
  }

  async returnCar(id: number, returnDate: Date) {
    const rental = await this.findOne(id);
    rental.status = 'completed';
    rental.actualReturnDate = returnDate;

    // Calculate late fees if applicable
    if (returnDate > rental.endDate) {
      const daysLate = Math.ceil(
        (returnDate.getTime() - rental.endDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      rental.lateFee = daysLate * rental.dailyRate * 0.5; // 50% penalty
    }

    return await this.rentalRepository.save(rental);
  }

  async extend(id: number, newEndDate: Date) {
    const rental = await this.findOne(id);
    
    if (rental.status !== 'active') {
      throw new BadRequestException('لا يمكن تمديد تأجير غير نشط');
    }

    const daysExtended = Math.ceil(
      (newEndDate.getTime() - rental.endDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    rental.endDate = newEndDate;
    rental.totalPrice += daysExtended * rental.dailyRate;

    return await this.rentalRepository.save(rental);
  }

  async getCarAvailability(carId: number, startDate: Date, endDate: Date) {
    const conflicts = await this.rentalRepository.find({
      where: {
        car: { id: carId },
        startDate: Between(startDate, endDate),
        status: 'active',
      },
    });

    return {
      available: conflicts.length === 0,
      conflicts,
    };
  }
}
