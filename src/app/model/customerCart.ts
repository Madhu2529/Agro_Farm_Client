import { CartProduct } from "./cartProduct";
import { Product } from "./product";

export class CustomerCart {
    cartId!: number;
    customerEmailId!: string;
    product!: Product;
    cartProducts!: CartProduct[];
    quantity!: number;
}