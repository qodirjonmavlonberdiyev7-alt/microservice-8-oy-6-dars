import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './cars/entities/car.entity';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      database: "microservice3",
      password: "1111",
      entities: [Car],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
