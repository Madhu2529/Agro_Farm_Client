import { Card } from "./card";
import { Order } from "./order";
import { TransactionStatus } from "./transactionStatus";



export class Transaction {
    transactionId!: string;
    order!: Order;
    card!: Card;
    totalPrice!: number;
    transactionDate!: Date;
    transactionStatus!: TransactionStatus;
}