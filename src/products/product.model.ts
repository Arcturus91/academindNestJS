import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

/*  
//yo puedo ir por los 2 medios: tanto como crear:
//o como hice arriba, que fue agregar private or public, access modifiers y mandarlo directo


export class Product {
id:string;
title:string;
.
.
.
constructor(id:string, title:string) {
    this id = id;
    this title = title;

    ..
    ..
}

} */
