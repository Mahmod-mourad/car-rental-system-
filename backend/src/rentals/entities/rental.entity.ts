import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.rentals)
  car: Car;

  @ManyToOne(() => Customer, customer => customer.rentals)
  customer: Customer;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @Column('timestamp', { nullable: true })
  actualReturnDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  dailyRate: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  lateFee: number;

  @Column('varchar', { length: 50 })
  rentalType: 'daily' | 'weekly' | 'monthly' | 'with_driver';

  @Column('varchar', { length: 50, default: 'active' })
  status: 'active' | 'completed' | 'cancelled';

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
