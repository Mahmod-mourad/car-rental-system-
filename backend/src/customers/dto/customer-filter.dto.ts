import { IsOptional, IsString, IsNumber } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class CustomerFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number
}
