import { IsOptional, IsString, IsNumber, IsEnum } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"
import { CarStatus, FuelType, Transmission } from "./create-car.dto"

export class CarFilterDto {
  @ApiProperty({ required: false, description: "البحث في النموذج والوصف" })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ required: false, description: "معرف العلامة التجارية" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  brandId?: number

  @ApiProperty({ required: false, description: "معرف الفئة" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number

  @ApiProperty({ required: false, description: "حالة السيارة", enum: CarStatus })
  @IsOptional()
  @IsEnum(CarStatus)
  status?: CarStatus

  @ApiProperty({ required: false, description: "أقل سعر" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number

  @ApiProperty({ required: false, description: "أعلى سعر" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number

  @ApiProperty({ required: false, description: "سنة الصنع" })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year?: number

  @ApiProperty({ required: false, description: "نوع الوقود", enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType

  @ApiProperty({ required: false, description: "نوع ناقل الحركة", enum: Transmission })
  @IsOptional()
  @IsEnum(Transmission)
  transmission?: Transmission
}
