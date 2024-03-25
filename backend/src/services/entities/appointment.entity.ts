import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Service } from './service.entity';
import { Car } from '../../cars/entities/car.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, service => service.appointments)
  service: Service;

  @ManyToOne(() => Car)
  car: Car;

  @ManyToOne(() => Customer)
  customer: Customer;

  @Column('timestamp')
  appointmentDate: Date;

  @Column('varchar', { length: 50, default: 'scheduled' })
  status: 'scheduled' | 'completed' | 'cancelled';

  @Column('timestamp', { nullable: true })
  completedAt: Date;

  @Column('text', { nullable: true })
  notes: string;

  @Column('text', { nullable: true })
  completionNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
