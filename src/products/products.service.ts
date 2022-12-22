import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './product.model';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = []; //estamos diciendo que queremos un array de elementos tipo Product (la clase modelo que creamos en product.model.ts)
  // le agregamos el private para que no pueda ser accedido desde otro lugar que esta clase.
  //model is a mongoose type. Now that we added the access modified: Private, and that makes the productModel to be a property.
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const id = uuidv4();
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      price,
    });
    //we used this in the CRUD with no DB part
    //this.products.push(newProduct); //method for pushing a new product into the products list

    //Now when we use Mongoose and MongoDB, and becayse we have created a property based in mongoose model, now we can use the method of the property based in mongoose method, like .save()
    //remember that mongoose methods return a promise.
    const result = await newProduct.save();
    console.log(result);
    return result.id as string; //with this last part : "as string" we indicate that specifically the response will yield a string.
  }

  getProducts() {
    //return this.products; //object and arrays are reference types in JS / This will return a pointer to the same list memory. Not good idea to return something that is outside the service. Better woould be to create a copy so we can handle it internally from the service
    return [...this.products]; // this way creates a copy of the original list content (the objects) and returns it.
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id)[0]; //retorna una array

    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId); //destructuring of an array
    const updatedProduct = { ...product };

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct; //nota que aquí estamos usando el original, no una copia.
  }

  deleteProduct(id: string): string {
    const [product, index] = this.findProduct(id);
    this.products.splice(index, 1);
    return `item ${id} deleted`;
  }

  private findProduct(id: string): [Product, number] {
    //nota que retorna una array tipo tuple; de exactamente 2 tipos de datos.

    const productIndex = this.products.findIndex((p) => p.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return [product, productIndex];
  }
}

/*
Objects, arrays, and functions are reference types.
A primitive type has a fixed size in memory. // the largest of the primitive types.
Number occupies eight bytes of memory
Boolean value can be represented with only one bit. 
*/
