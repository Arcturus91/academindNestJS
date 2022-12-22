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
  async addProduct(
    @Body() requestBody: { title: string; description: string; price: number },
  ) {
    const generatedId = await this.productsService.insertProduct(
      //note await is really important here becayse insertProduct returns a promise that comes from products.service.
      //if you do not put an await here, the return in lines below will be triggered but without content.
      //consequently, we wait for the productsService.inserProduct response which is the generatedId.
      // and what i will return as a response from the post request is the id:generatedId; but generatedId needs to arrive first. Thats why we have to handle with async await (or .then)
      requestBody.title,
      requestBody.description,
      requestBody.price,
    );
    return { id: generatedId }; //because we are returning an objet, NestJS will set the content-type header as a JSON.
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }
  //in the controller is where i build the app functionality

  @Get(':id') //if i only put the Get decorator, it will not work. the first get will take over.
  //thats why we add a parameter
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null; // because we don't need to send back data accordingly to this example.
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
  }
}

//patch is for partially updating. I want merge. Not replace everything. I wanna use the resource as a base.
//put for replacing the resource entirely.

//en el controlador yo creo lo que voy a hacer, en el servicio yo creo el detalle de eso qe wuiero hacer.
//el módulo los une.
