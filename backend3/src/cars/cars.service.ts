import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    @Inject("CAR_SERVICE") private readonly client: ClientProxy,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    return await this.carsRepository.save(car);
  }

  async findAll(): Promise<Car[]> {
     this.client.emit("hello", "Hello from backend3")
    return await this.carsRepository.find();
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return await this.carsRepository.find({
      where: { brand: Like(`%${brand}%`) },
    });
  }

  async findAvailable(): Promise<Car[]> {
    return await this.carsRepository.find({
      where: { isAvailable: true },
    });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.findOne(id);
    Object.assign(car, updateCarDto);
    return await this.carsRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const result = await this.carsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
  }
}