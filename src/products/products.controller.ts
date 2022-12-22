import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
    //you are using the type as a class. Also, we are adding the access modifier "private" for making the property directly available without having to declare it.
  }
  @Post()
  addProduct(
    @Body() requestBody: { title: string; description: string; price: number },
  ) {
    const generatedId = this.productService.insertProduct(
      requestBody.title,
      requestBody.description,
      requestBody.price,
    );
    return { id: generatedId }; //because we are returning an objet, NestJS will set the content-type header as a JSON.
  }


@Get
  getAllProducts(){}
}
