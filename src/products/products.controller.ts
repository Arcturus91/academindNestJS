import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
    //you are using the type as a class. Also, we are adding the access modifier "private" for making the property directly available without having to declare it.
  }
  @Post()
  addProduct(
    @Body() requestBody: { title: string; description: string; price: number },
  ) {
    const generatedId = this.productsService.insertProduct(
      requestBody.title,
      requestBody.description,
      requestBody.price,
    );
    return { id: generatedId }; //because we are returning an objet, NestJS will set the content-type header as a JSON.
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }
  //in the controller is where i build the app functionality

  @Get(':id') //if i only put the Get decorator, it will not work. the first get will take over.
  //thats why we add a parameter
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }
}
