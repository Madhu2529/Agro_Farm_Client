
import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer';
import { CustomerCart } from '../model/customerCart';
import { CustomerHomeService } from './customer-home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit{
  isViewProductSelected: boolean = false;
  isRouting: boolean = false;
  optionSelected!: string;
  loggedInCustomer!: Customer;
  searchText!: string;
  cart: CustomerCart[] = [];
  aStr: string = '';

  constructor(private router: Router,
    private customerHomeService: CustomerHomeService) {
      customerHomeService.loggedInCustomer.subscribe((custName: Customer) => {
        this.loggedInCustomer = custName
      })
    }

    ngOnInit(){

      this.getLoggedInCustomer();
      this.getCustomerCart();
      
    }

    getLoggedInCustomer() {

      let temp!: any;
      temp = sessionStorage.getItem('customer');
      this.customerHomeService.updatedCustomer()
    }
    

    getCustomerCart() {
      
      this.customerHomeService.updatedCartList.subscribe((cartList: CustomerCart[]) => this.cart = cartList)
      this.customerHomeService.getCustomerCart(this.loggedInCustomer.emailId).subscribe(
        cart => {
          this.cart = cart;
          sessionStorage.setItem("cart", JSON.stringify(this.cart));
          this.customerHomeService.updateCartList(this.cart)
          
        }, err => {
          this.cart = [];
          // sessionStorage.setItem("cart", JSON.stringify(this.cart));
          this.customerHomeService.updateCartList(this.cart);
          this.customerHomeService.updatedCartList.subscribe((cartList) => this.cart = cartList)
        }
      )

    }

    logOut() {
      sessionStorage.clear();
      this.router.navigate([""])
    }

}