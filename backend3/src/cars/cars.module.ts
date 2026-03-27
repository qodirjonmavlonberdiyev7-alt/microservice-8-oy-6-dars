import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
  ClientsModule.register([
      {
        name: 'CAR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'car_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
