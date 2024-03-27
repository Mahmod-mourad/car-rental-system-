import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Sale } from '../sales/entities/sale.entity';
import { Rental } from '../rentals/entities/rental.entity';
import { Car } from '../cars/entities/car.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async getSalesReport(startDate?: Date, endDate?: Date) {
    const query = this.saleRepository.createQueryBuilder('sale');

    if (startDate && endDate) {
      query.where('sale.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const sales = await query.leftJoinAndSelect('sale.car', 'car').getMany();

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

    return {
      totalSales: sales.length,
      totalRevenue,
      averageSale: sales.length > 0 ? totalRevenue / sales.length : 0,
      sales,
    };
  }

  async getRentalReport(startDate?: Date, endDate?: Date) {
    const query = this.rentalRepository.createQueryBuilder('rental');

    if (startDate && endDate) {
      query.where('rental.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    const rentals = await query
      .leftJoinAndSelect('rental.car', 'car')
      .getMany();

    const totalRevenue = rentals.reduce((sum, rental) => sum + rental.totalPrice, 0);
    const totalLateFees = rentals.reduce((sum, rental) => sum + rental.lateFee, 0);

    return {
      totalRentals: rentals.length,
      totalRevenue,
      totalLateFees,
      averageRental: rentals.length > 0 ? totalRevenue / rentals.length : 0,
      rentals,
    };
  }

  async getDashboardStats() {
    const totalCars = await this.carRepository.count();
    const activeCars = await this.carRepository.count({
      where: { status: 'available' },
    });
    const totalSales = await this.saleRepository.count();
    const totalRentals = await this.rentalRepository.count({
      where: { status: 'active' },
    });

    const recentSales = await this.saleRepository.find({
      take: 5,
      order: { createdAt: 'DESC' },
      relations: ['car', 'customer'],
    });

    return {
      totalCars,
      activeCars,
      rentedCars: totalCars - activeCars,
      totalSales,
      activeRentals: totalRentals,
      recentSales,
    };
  }

  async getPerformanceReport(startDate?: Date, endDate?: Date) {
    const salesReport = await this.getSalesReport(startDate, endDate);
    const rentalReport = await this.getRentalReport(startDate, endDate);

    const totalRevenue = salesReport.totalRevenue + rentalReport.totalRevenue;
    const salesPercentage =
      totalRevenue > 0 ? (salesReport.totalRevenue / totalRevenue) * 100 : 0;
    const rentalPercentage =
      totalRevenue > 0 ? (rentalReport.totalRevenue / totalRevenue) * 100 : 0;

    return {
      totalRevenue,
      salesReport: {
        ...salesReport,
        percentage: salesPercentage,
      },
      rentalReport: {
        ...rentalReport,
        percentage: rentalPercentage,
      },
    };
  }
}
