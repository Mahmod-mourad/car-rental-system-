import { IsString, IsEmail, IsOptional, IsDateString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCustomerDto {
  @ApiProperty({ description: "الاسم الأول" })
  @IsString()
  firstName: string

  @ApiProperty({ description: "الاسم الأخير" })
  @IsString()
  lastName: string

  @ApiProperty({ description: "البريد الإلكتروني" })
  @IsEmail()
  email: string

  @ApiProperty({ description: "رقم الهاتف" })
  @IsString()
  phone: string

  @ApiProperty({ description: "العنوان", required: false })
  @IsOptional()
  @IsString()
  address?: string

  @ApiProperty({ description: "المدينة", required: false })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({ description: "البلد", required: false })
  @IsOptional()
  @IsString()
  country?: string

  @ApiProperty({ description: "تاريخ الميلاد", required: false })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string

  @ApiProperty({ description: "رقم رخصة القيادة", required: false })
  @IsOptional()
  @IsString()
  drivingLicenseNumber?: string

  @ApiProperty({ description: "تاريخ انتهاء رخصة القيادة", required: false })
  @IsOptional()
  @IsDateString()
  drivingLicenseExpiry?: string

  @ApiProperty({ description: "اسم جهة الاتصال في حالات الطوارئ", required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string

  @ApiProperty({ description: "رقم هاتف جهة الاتصال في حالات الطوارئ", required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string

  @ApiProperty({ description: "ملاحظات", required: false })
  @IsOptional()
  @IsString()
  notes?: string
}
