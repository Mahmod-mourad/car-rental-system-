import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rentals')
@UseGuards(JwtAuthGuard)
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.create(createRentalDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.rentalsService.findAll(page, limit);
  }

  @Get('active')
  getActive() {
    return this.rentalsService.getActive();
  }

  @Get('overdue')
  getOverdue() {
    return this.rentalsService.getOverdue();
  }

  @Get('car/:carId/availability')
  getAvailability(
    @Param('carId') carId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.rentalsService.getCarAvailability(
      +carId,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Post(':id/return')
  returnCar(
    @Param('id') id: string,
    @Body() { returnDate }: { returnDate: string },
  ) {
    return this.rentalsService.returnCar(+id, new Date(returnDate));
  }

  @Post(':id/extend')
  extend(
    @Param('id') id: string,
    @Body() { newEndDate }: { newEndDate: string },
  ) {
    return this.rentalsService.extend(+id, new Date(newEndDate));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }
}
