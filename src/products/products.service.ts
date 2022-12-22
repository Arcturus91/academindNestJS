import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.model';
@Injectable()
export class ProductsService {
  private products: Product[] = []; //estamos diciendo que queremos un array de elementos tipo Product (la clase modelo que creamos en product.model.ts)
  // le agregamos el private para que no pueda ser accedido desde otro lugar que esta clase.
  insertProduct(title: string, product: string, price: number) {
    const id = uuidv4();
    const newProduct = new Product(id, title, product, price);
    this.products.push(newProduct); //method for pushing a new product into the products list
    return String(id);
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
