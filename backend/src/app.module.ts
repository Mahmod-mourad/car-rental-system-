import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ScheduleModule } from "@nestjs/schedule"
import { DatabaseModule } from "./database/database.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CarsModule } from "./cars/cars.module"
import { CustomersModule } from "./customers/customers.module"
import { SalesModule } from "./sales/sales.module"
import { RentalsModule } from "./rentals/rentals.module"
import { ServicesModule } from "./services/services.module"
import { ReportsModule } from "./reports/reports.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CarsModule,
    CustomersModule,
    SalesModule,
    RentalsModule,
    ServicesModule,
    ReportsModule,
  ],
})
export class AppModule {}
