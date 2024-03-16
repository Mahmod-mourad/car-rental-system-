import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import type { CarsService } from "./cars.service"
import type { CreateCarDto } from "./dto/create-car.dto"
import type { UpdateCarDto } from "./dto/update-car.dto"
import type { CarFilterDto } from "./dto/car-filter.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'إضافة سيارة جديدة' })
  @ApiResponse({ status: 201, description: 'تم إضافة السيارة بنجاح' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'الحصول على جميع السيارات' })
  @ApiResponse({ status: 200, description: 'قائمة السيارات' })
  @ApiQuery({ name: 'search', required: false, description: 'البحث في النموذج والوصف' })
  @ApiQuery({ name: 'brandId', required: false, description: 'معرف العلامة التجارية' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'معرف الفئة' })
  @ApiQuery({ name: 'status', required: false, description: 'حالة السيارة' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'أقل سعر' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'أعلى سعر' })
  findAll(@Query() filters: CarFilterDto) {
    return this.carsService.findAll(filters);
  }

  @Get("brands")
  @ApiOperation({ summary: "الحصول على جميع العلامات التجارية" })
  @ApiResponse({ status: 200, description: "قائمة العلامات التجارية" })
  getBrands() {
    return this.carsService.getBrands()
  }

  @Get("categories")
  @ApiOperation({ summary: "الحصول على جميع الفئات" })
  @ApiResponse({ status: 200, description: "قائمة الفئات" })
  getCategories() {
    return this.carsService.getCategories()
  }

  @Get(':id')
  @ApiOperation({ summary: 'الحصول على سيارة محددة' })
  @ApiResponse({ status: 200, description: 'بيانات السيارة' })
  @ApiResponse({ status: 404, description: 'السيارة غير موجودة' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "تحديث بيانات السيارة" })
  @ApiResponse({ status: 200, description: "تم تحديث السيارة بنجاح" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'حذف السيارة' })
  @ApiResponse({ status: 200, description: 'تم حذف السيارة بنجاح' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }

  @Post('brands')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'إضافة علامة تجارية جديدة' })
  @ApiResponse({ status: 201, description: 'تم إضافة العلامة التجارية بنجاح' })
  createBrand(@Body() body: { name: string; logo?: string }) {
    return this.carsService.createBrand(body.name, body.logo);
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'إضافة فئة جديدة' })
  @ApiResponse({ status: 201, description: 'تم إضافة الفئة بنجاح' })
  createCategory(@Body() body: { name: string; description?: string }) {
    return this.carsService.createCategory(body.name, body.description);
  }
}
