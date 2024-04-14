import { Injectable, Optional, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { CarImage } from './entities/car-image.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarFilterDto } from './dto/car-filter.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Optional()
    @InjectRepository(CarImage)
    private carImageRepository: Repository<CarImage>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carRepository.save(createCarDto as any) as Promise<Car>;
  }

  async findAll(filters?: CarFilterDto): Promise<Car[]> {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.brandId) where.brand = { id: filters.brandId };
    if (filters?.year) where.year = filters.year;
    return this.carRepository.find({ where, order: { createdAt: 'DESC' } as any });
  }

  async findOne(id: number | string): Promise<Car | null> {
    const car = await this.carRepository.findOne({ where: { id: id as any } });
    return car ?? null;
  }

  async update(id: number | string, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update(id as any, updateCarDto as any);
    return this.findOne(id);
  }

  async remove(id: number | string): Promise<void> {
    await this.carRepository.update(id as any, { status: 'deleted' as any });
  }

  async getBrands(): Promise<Brand[]> {
    return this.brandRepository.find({ order: { name: 'ASC' } });
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }
}
