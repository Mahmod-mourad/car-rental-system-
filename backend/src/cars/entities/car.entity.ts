import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { CarImage } from './car-image.entity';

export enum CarStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RENTED = 'rented',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved',
}

export enum CarAvailability {
  SALE = 'sale',
  RENTAL = 'rental',
  BOTH = 'both',
}

export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  CVT = 'cvt',
}

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand, brand => brand.cars)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  brandId: number;

  @ManyToOne(() => Category, category => category.cars)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  @Column({ length: 100 })
  model: string;

  @Column()
  year: number;

  @Column({ length: 50 })
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salePrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  dailyRentalPrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  weeklyRentalPrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  monthlyRentalPrice: number;

  @Column({ length: 3, default: 'SAR' })
  currency: string;

  @Column({
    type: 'enum',
    enum: CarAvailability,
    default: CarAvailability.BOTH,
  })
  availability: CarAvailability;

  @Column({
    type: 'enum',
    enum: CarStatus,
    default: CarStatus.AVAILABLE,
  })
  status: CarStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  engineType: string;

  @Column({
    type: 'enum',
    enum: FuelType,
    nullable: true,
  })
  fuelType: FuelType;

  @Column({
    type: 'enum',
    enum: TransmissionType,
    nullable: true,
  })
  transmission: TransmissionType;

  @Column({ type: 'decimal', precision: 4, scale: 1, nullable: true })
  fuelConsumption: number;

  @Column({ nullable: true })
  mileage: number;

  @Column({ nullable: true })
  seats: number;

  @Column('simple-array', { nullable: true })
  features: string[];

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ length: 100, nullable: true })
  dealer: string;

  @OneToMany(() => CarImage, image => image.car, { cascade: true })
  images: CarImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
