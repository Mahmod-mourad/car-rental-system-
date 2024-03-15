import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsArray, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'أحمد محمد' })
  @IsNotEmpty({ message: 'الاسم مطلوب' })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'البريد الإلكتروني غير صحيح' })
  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
  email: string;

  @ApiProperty({ example: '+966501234567', required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
  @MinLength(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.EMPLOYEE })
  @IsEnum(UserRole, { message: 'دور المستخدم غير صحيح' })
  role: UserRole;

  @ApiProperty({ example: ['cars', 'customers'], required: false })
  @IsOptional()
  @IsArray()
  permissions?: string[];

  @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE, required: false })
  @IsOptional()
  @IsEnum(UserStatus, { message: 'حالة المستخدم غير صحيحة' })
  status?: UserStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  avatar?: string;
}
