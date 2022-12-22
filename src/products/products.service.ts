import { Injectable } from '@nestjs/common';
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







}
