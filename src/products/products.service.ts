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
    //const id = uuidv4();
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

    return result.id as string; //with this last part : "as string" we indicate that specifically the response will yield a string.
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    //return this.products; //object and arrays are reference types in JS / This will return a pointer to the same list memory. Not good idea to return something that is outside the service. Better woould be to create a copy so we can handle it internally from the service

    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    })); // this way creates a copy of the original list content (the objects) and returns it.
  }

  async getSingleProduct(id: string) {
    const product = await this.findProduct(id);

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId); //destructuring of an array

    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }

    // this.products[index] = updatedProduct; //nota que aquí estamos usando el original, no una copia.
    updatedProduct.save();
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Element not found');
    }
    return null;
  }

  private async findProduct(id: string): Promise<Product> {
    //nota que retorna una array tipo tuple; de exactamente 2 tipos de datos.
    let product;
    try {
      //productModel has been injected by the imports section in the products controller file.
      //remember that is a property.
      product = await this.productModel.findById(id);
    } catch (e) {
      throw new NotFoundException('could not find ID');
    }

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }
}

/*
Objects, arrays, and functions are reference types.
A primitive type has a fixed size in memory. // the largest of the primitive types.
Number occupies eight bytes of memory
Boolean value can be represented with only one bit. 
*/
