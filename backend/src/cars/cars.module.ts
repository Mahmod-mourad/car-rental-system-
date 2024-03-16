import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CarsService } from "./cars.service"
import { CarsController } from "./cars.controller"
import { Car } from "./entities/car.entity"
import { Brand } from "./entities/brand.entity"
import { Category } from "./entities/category.entity"
import { CarImage } from "./entities/car-image.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Car, Brand, Category, CarImage])],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
