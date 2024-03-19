import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import type { CustomersService } from "./customers.service"
import type { CreateCustomerDto } from "./dto/create-customer.dto"
import type { UpdateCustomerDto } from "./dto/update-customer.dto"
import type { CustomerFilterDto } from "./dto/customer-filter.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Customers")
@Controller("customers")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'إضافة عميل جديد' })
  @ApiResponse({ status: 201, description: 'تم إضافة العميل بنجاح' })
  @ApiResponse({ status: 409, description: 'العميل موجود بالفعل' })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'الحصول على جميع العملاء' })
  @ApiResponse({ status: 200, description: 'قائمة العملاء' })
  findAll(@Query() filters: CustomerFilterDto) {
    return this.customersService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'الحصول على عميل محدد' })
  @ApiResponse({ status: 200, description: 'بيانات العميل' })
  @ApiResponse({ status: 404, description: 'العميل غير موجود' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'الحصول على إحصائيات العميل' })
  @ApiResponse({ status: 200, description: 'إحصائيات العميل' })
  getStats(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.getCustomerStats(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "تحديث بيانات العميل" })
  @ApiResponse({ status: 200, description: "تم تحديث العميل بنجاح" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف العميل' })
  @ApiResponse({ status: 200, description: 'تم حذف العميل بنجاح' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
