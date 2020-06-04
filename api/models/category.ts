import { Product } from "./product";

export class Category {
    public id: number;
    public name: string;
    public products: Product[];

    constructor(data: any = null) {
      this.id = data ? data['id'] : null;
      this.name = data ? data['name'] : null;
      this.products = [];
    }
}