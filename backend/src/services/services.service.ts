import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { Appointment } from './entities/appointment.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CarsService } from '../cars/cars.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private carsService: CarsService,
    private customersService: CustomersService,
  ) {}

  async createService(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAllServices(page = 1, limit = 10) {
    const [data, total] = await this.serviceRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findServiceById(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });

    if (!service) {
      throw new NotFoundException('الخدمة غير موجودة');
    }

    return service;
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    const service = await this.findServiceById(createAppointmentDto.serviceId);
    const car = await this.carsService.findOne(createAppointmentDto.carId);
    const customer = await this.customersService.findOne(createAppointmentDto.customerId);

    if (!car || !customer) {
      throw new NotFoundException('السيارة أو العميل غير موجود');
    }

    const appointment = this.appointmentRepository.create({
      service,
      car,
      customer,
      appointmentDate: new Date(createAppointmentDto.appointmentDate),
      status: 'scheduled',
      notes: createAppointmentDto.notes,
    });

    return await this.appointmentRepository.save(appointment);
  }

  async findAllAppointments(page = 1, limit = 10) {
    const [data, total] = await this.appointmentRepository.findAndCount({
      relations: ['service', 'car', 'customer'],
      skip: (page - 1) * limit,
      take: limit,
      order: { appointmentDate: 'ASC' },
    });

    return { data, total, page, limit };
  }

  async findAppointmentById(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['service', 'car', 'customer'],
    });

    if (!appointment) {
      throw new NotFoundException('الموعد غير موجود');
    }

    return appointment;
  }

  async completeAppointment(id: number, completionNotes: string) {
    const appointment = await this.findAppointmentById(id);
    appointment.status = 'completed';
    appointment.completionNotes = completionNotes;
    appointment.completedAt = new Date();

    return await this.appointmentRepository.save(appointment);
  }

  async getUpcomingAppointments() {
    const now = new Date();
    return await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.car', 'car')
      .leftJoinAndSelect('appointment.customer', 'customer')
      .where('appointment.appointmentDate >= :now', { now })
      .andWhere('appointment.status = :status', { status: 'scheduled' })
      .orderBy('appointment.appointmentDate', 'ASC')
      .getMany();
  }
}
