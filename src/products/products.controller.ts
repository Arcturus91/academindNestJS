import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null; // because we don't need to send back data accordingly to this example.
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}

//patch is for partially updating. I want merge. Not replace everything. I wanna use the resource as a base.
//put for replacing the resource entirely.

//en el controlador yo creo lo que voy a hacer, en el servicio yo creo el detalle de eso qe wuiero hacer.
//el módulo los une.
