import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerCart } from 'src/app/model/customerCart';
import { CustomerCartService } from './customer-cart.service';
import { CustomerHomeService } from '../customer-home.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.scss']
})
export class CustomerCartComponent implements OnInit {

  cartList: CustomerCart[] = [];
  selectedCartProduct!: CustomerCart;
  viewCartProductDetails: boolean = false;
  successMessage!: string;
  errorMessage!: string;
  loggedInCustomer!: any;

  constructor(private router: Router, 
    private customerCartService: CustomerCartService, 
    private customerHomeService: CustomerHomeService) {
  }

  ngOnInit(): void {
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer') || "{}");
    this.getCustomerCart();
    this.customerHomeService.getCustomerCart(this.loggedInCustomer.emailId);
    this.viewCartProductDetails = false;
  }

  alter(operation: string, cart: CustomerCart) {
    if(operation == '-'){
      cart.quantity--;
    }else {
      cart.quantity++;
    }
    this.successMessage = "";
    this.errorMessage = "";
    let loggedInCustomer: any = JSON.parse(sessionStorage.getItem('customer') || "{}");
    this.customerCartService.updateProductFromCart(cart, loggedInCustomer.emailId).subscribe(
      message => {
        this.getCustomerCart();
        this.successMessage = message;
      }, error => this.errorMessage = <any>error
    )
  }

  setSelectedCart(cart: CustomerCart) {
    this.successMessage = "";
    this.errorMessage = "";
    this.viewCartProductDetails = true;
    this.selectedCartProduct = cart;
  }

  getCustomerCart() {
    this.customerCartService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
      cart => {
        this.cartList = cart;
        sessionStorage.setItem("cart", JSON.stringify(this.cartList));
        this.customerHomeService.updateCartList(this.cartList);
      },
      err => {
        this.customerHomeService.updatedCartList.subscribe(cartList => this.cartList = cartList)
      }
    )
  }

  deleteProductFromCart(cart: CustomerCart) {

    this.successMessage = "";
    this.errorMessage = "";

    this.customerCartService.deleteProductFromCart(cart,this.loggedInCustomer.emailId).subscribe(
      message => {
        this.cartList = this.cartList.filter((item)=>item.cartId != cart.cartId);
        console.log(this.cartList);
        this.customerHomeService.updateCartList(this.cartList);
        sessionStorage.setItem("cart", JSON.stringify(this.cartList));
        this.successMessage = message;
        this.ngOnInit();
      },
      err => {
         this.errorMessage = <any>err;
      }
    )
  }

  emptyCart() {
    this.successMessage = "";
    this.errorMessage = "";

    this.customerCartService.emptyCart(this.loggedInCustomer.emailId).subscribe(
      message => {
        this.successMessage = message
      },
      err => {
        this.errorMessage = err
      }
    )
  }

  placeOrder(cart: CustomerCart[]) {
    this.router.navigate(["/home/placeOrder"]);
  }

  continueShopping() {
    this.router.navigate(["/home/products"]);
  }


}
