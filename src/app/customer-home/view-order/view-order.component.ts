import { Component, OnInit } from '@angular/core';
import { ViewOrderService } from './view-order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit{

  p: number = 1;
  loggedInCustomer: any;
  successMessage: any = null;
  errorMessage: any = null;
  orders!: any[];

  constructor(private service: ViewOrderService){
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem("customer") || "{}");
  }
  

  ngOnInit(): void {
   this.service.getOrders(this.loggedInCustomer.emailId).subscribe(
    success => this.orders = success,
    error => this.errorMessage = error
   )
  }

  pdf(order: any) {

    let docDefinition = {
      content : [
        {
          text : "Invoice",
          fontSize : 35,
          alignment : "center",
          color : "#047886",
          marginBottom : 15
        },
        {
          text : "Customer Name :   " + this.loggedInCustomer.name,
          bold : true,
          fontSize : 15,
          marginBottom : 10 
        },
        {
          columns: [
            [
              "Order Number",
              "Order Date and Time",
              "Shipping Address",
              "Product Id",
              "Product Name",
              "Category",
              "Price",
              "Discount Amount",
              "Quantity",
              "Total Amount",
              "Grand Total",
            ],
            [
              order.orderNumber,
              order.dateOfOrder,
              order.addressId,
              order.product.productId,
              order.product.name,
              order.product.category,
              order.product.price,
              (order.product.discount * order.product.price)/100,
              order.quantity,
              order.product.price - (order.product.discount * order.product.price) / 100,
              order.totalPrice
            ]
          ],
          fontSize : 14,
          marginBottom : 8
        }
      ]
    }
  }

  

}
