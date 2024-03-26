import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('services')
@UseGuards(JwtAuthGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto);
  }

  @Get()
  findAllServices(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.servicesService.findAllServices(page, limit);
  }

  @Get(':id')
  findServiceById(@Param('id') id: string) {
    return this.servicesService.findServiceById(+id);
  }

  @Post('appointments')
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.servicesService.createAppointment(createAppointmentDto);
  }

  @Get('appointments')
  findAllAppointments(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.servicesService.findAllAppointments(page, limit);
  }

  @Get('appointments/upcoming')
  getUpcomingAppointments() {
    return this.servicesService.getUpcomingAppointments();
  }

  @Post('appointments/:id/complete')
  completeAppointment(
    @Param('id') id: string,
    @Body() { completionNotes }: { completionNotes: string },
  ) {
    return this.servicesService.completeAppointment(+id, completionNotes);
  }

  @Get('appointments/:id')
  findAppointmentById(@Param('id') id: string) {
    return this.servicesService.findAppointmentById(+id);
  }
}
