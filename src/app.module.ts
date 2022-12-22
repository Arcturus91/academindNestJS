import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      `mongodb+srv://arcturus:${process.env.MONGOSECRET}@cluster0.dl3jp.mongodb.net/nestjs-demo?retryWrites=true&w=majority`,
    ),
  ], // aqui es donde pongo los módulos.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
