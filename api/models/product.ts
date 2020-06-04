export class Product {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public price: number;
    public category_id: number;

    constructor(data: any = null) {
      this.id = data ? data['id'] : null;
      this.name = data ? data['name'] : null;
      this.description = data ? data['description'] : null;
      this.image = data ? data['image'] : null;
      this.price = data ? data['price'] : null;
      this.category_id = data ? data['category_id'] : null;
    }
}