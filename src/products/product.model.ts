export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
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
