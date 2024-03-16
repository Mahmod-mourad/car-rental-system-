import { Injectable, NotFoundException } from "@nestjs/common"
import type { Repository } from "typeorm"
import type { Car } from "./entities/car.entity"
import type { Brand } from "./entities/brand.entity"
import type { Category } from "./entities/category.entity"
import type { CarImage } from "./entities/car-image.entity"
import type { CreateCarDto } from "./dto/create-car.dto"
import type { UpdateCarDto } from "./dto/update-car.dto"
import type { CarFilterDto } from "./dto/car-filter.dto"

@Injectable()
export class CarsService {
  constructor(
    private carRepository: Repository<Car>,
    private brandRepository: Repository<Brand>,
    private categoryRepository: Repository<Category>,
    private carImageRepository: Repository<CarImage>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const { brandId, categoryId, images, ...carData } = createCarDto

    // Verify brand exists
    const brand = await this.brandRepository.findOne({ where: { id: brandId } })
    if (!brand) {
      throw new NotFoundException("العلامة التجارية غير موجودة")
    }

    // Verify category exists
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
    if (!category) {
      throw new NotFoundException("الفئة غير موجودة")
    }

    // Create car
    const car = this.carRepository.create({
      ...carData,
      brand,
      category,
    })

    const savedCar = await this.carRepository.save(car)

    // Add images if provided
    if (images && images.length > 0) {
      const carImages = images.map((imageUrl) =>
        this.carImageRepository.create({
          imageUrl,
          car: savedCar,
          isPrimary: images.indexOf(imageUrl) === 0,
        }),
      )
      await this.carImageRepository.save(carImages)
    }

    return this.findOne(savedCar.id)
  }

  async findAll(filters?: CarFilterDto) {
    const query = this.carRepository
      .createQueryBuilder("car")
      .leftJoinAndSelect("car.brand", "brand")
      .leftJoinAndSelect("car.category", "category")
      .leftJoinAndSelect("car.images", "images")
      .orderBy("car.createdAt", "DESC")

    if (filters) {
      if (filters.search) {
        query.andWhere("(car.model ILIKE :search OR car.description ILIKE :search OR brand.name ILIKE :search)", {
          search: `%${filters.search}%`,
        })
      }

      if (filters.brandId) {
        query.andWhere("car.brandId = :brandId", { brandId: filters.brandId })
      }

      if (filters.categoryId) {
        query.andWhere("car.categoryId = :categoryId", { categoryId: filters.categoryId })
      }

      if (filters.status) {
        query.andWhere("car.status = :status", { status: filters.status })
      }

      if (filters.minPrice) {
        query.andWhere("car.price >= :minPrice", { minPrice: filters.minPrice })
      }

      if (filters.maxPrice) {
        query.andWhere("car.price <= :maxPrice", { maxPrice: filters.maxPrice })
      }

      if (filters.year) {
        query.andWhere("car.year = :year", { year: filters.year })
      }

      if (filters.fuelType) {
        query.andWhere("car.fuelType = :fuelType", { fuelType: filters.fuelType })
      }

      if (filters.transmission) {
        query.andWhere("car.transmission = :transmission", { transmission: filters.transmission })
      }
    }

    const cars = await query.getMany()
    return cars
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ["brand", "category", "images"],
    })

    if (!car) {
      throw new NotFoundException("السيارة غير موجودة")
    }

    return car
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id)

    const { brandId, categoryId, images, ...carData } = updateCarDto

    // Update brand if provided
    if (brandId) {
      const brand = await this.brandRepository.findOne({ where: { id: brandId } })
      if (!brand) {
        throw new NotFoundException("العلامة التجارية غير موجودة")
      }
      car.brand = brand
    }

    // Update category if provided
    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
      if (!category) {
        throw new NotFoundException("الفئة غير موجودة")
      }
      car.category = category
    }

    // Update car data
    Object.assign(car, carData)
    const updatedCar = await this.carRepository.save(car)

    // Update images if provided
    if (images) {
      // Remove existing images
      await this.carImageRepository.delete({ car: { id } })

      // Add new images
      if (images.length > 0) {
        const carImages = images.map((imageUrl) =>
          this.carImageRepository.create({
            imageUrl,
            car: updatedCar,
            isPrimary: images.indexOf(imageUrl) === 0,
          }),
        )
        await this.carImageRepository.save(carImages)
      }
    }

    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id)
    await this.carRepository.remove(car)
  }

  async getBrands() {
    return this.brandRepository.find({ order: { name: "ASC" } })
  }

  async getCategories() {
    return this.categoryRepository.find({ order: { name: "ASC" } })
  }

  async createBrand(name: string, logo?: string) {
    const brand = this.brandRepository.create({ name, logo })
    return this.brandRepository.save(brand)
  }

  async createCategory(name: string, description?: string) {
    const category = this.categoryRepository.create({ name, description })
    return this.categoryRepository.save(category)
  }
}
