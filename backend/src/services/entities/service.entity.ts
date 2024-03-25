import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 100 })
  category: 'maintenance' | 'repair' | 'beauty' | 'inspection' | 'insurance' | 'finance';

  @Column('decimal', { precision: 10, scale: 2 })
  estimatedPrice: number;

  @Column('int', { default: 24 })
  estimatedDuration: number; // in hours

  @Column('boolean', { default: true })
  isActive: boolean;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
