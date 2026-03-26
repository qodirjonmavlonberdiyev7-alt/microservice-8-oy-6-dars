import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto)
  }

  async findAll() {
    return await this.productModel.find()
  }

  async findOne(id: string) {
    const foundedProduct = await this.productModel.findById(id)
    if(!foundedProduct) throw new NotFoundException()
    return foundedProduct
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const foundedProduct = await this.productModel.findById(id)
    if(!foundedProduct) throw new NotFoundException()
    return await this.productModel.updateOne(foundedProduct._id, updateProductDto)
  }

  async remove(id: string) {
    const foundedProduct = await this.productModel.findById(id)
    if(!foundedProduct) throw new NotFoundException()
    return await this.productModel.deleteOne(foundedProduct._id)
  }
}
