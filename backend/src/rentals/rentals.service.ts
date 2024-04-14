import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalRepository.save({
      ...createRentalDto,
      status: 'active',
    } as any) as Promise<Rental>;
  }

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: ['car', 'customer'],
      order: { createdAt: 'DESC' } as any,
    });
  }

  async findOne(id: number | string): Promise<Rental | null> {
    const rental = await this.rentalRepository.findOne({
      where: { id: id as any },
      relations: ['car', 'customer'],
    });
    return rental ?? null;
  }

  async findActive(): Promise<Rental[]> {
    return this.rentalRepository.find({ where: { status: 'active' } });
  }

  async findOverdue(): Promise<Rental[]> {
    const now = new Date();
    return this.rentalRepository.find({
      where: { status: 'active', endDate: LessThan(now) },
    });
  }

  calculateLateFee(endDate: Date, returnDate: Date, lateFeePerDay: number): number {
    if (returnDate <= endDate) return 0;
    const daysLate = Math.ceil(
      (returnDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysLate * lateFeePerDay;
  }

  async returnCar(id: number | string, returnDate: Date): Promise<Rental> {
    const rental = await this.findOne(id);
    if (!rental) throw new NotFoundException('التأجير غير موجود');
    rental.status = 'completed';
    rental.actualReturnDate = returnDate;
    if (returnDate > rental.endDate) {
      rental.lateFee = this.calculateLateFee(rental.endDate, returnDate, rental.dailyRate * 0.5);
    }
    return this.rentalRepository.save(rental);
  }
}
