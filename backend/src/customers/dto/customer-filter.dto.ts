import { IsOptional, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CustomerFilterDto {
  @ApiProperty({ required: false, description: "البحث في الاسم والبريد والهاتف" })
  @IsOptional()
  @IsString()
  search?: string

  @ApiProperty({ required: false, description: "حالة العميل" })
  @IsOptional()
  @IsString()
  status?: string

  @ApiProperty({ required: false, description: "المدينة" })
  @IsOptional()
  @IsString()
  city?: string
}
