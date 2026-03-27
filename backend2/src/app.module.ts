import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot("mongodbhfbhr_dhbb_nestcli_df6886"),
    ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
