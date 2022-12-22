import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://arcturus:HUXhYEjvauKIschm@cluster0.dl3jp.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
  ], // aqui es donde pongo los módulos.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
