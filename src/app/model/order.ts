import { OrderProduct } from "./orderProduct";

export class Order {
    orderId!: number;
    customerEmailId!: string;
    dateOfOrder!: Date;
    totalPrice!: number;
    orderStatus!: string;
    discount!: number;
    paymentThrough!: string;
    dateOfDelivery!: Date;
    deliveryAddress!: string;
    orderedProduct!: OrderProduct[];

}