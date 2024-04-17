import { Product } from "./product";

export class OrderProduct {
    orderedProductId!: number;
    product!: Product;
    quantity!: number;
}