import { Component, Input, OnInit } from '@angular/core';
import { CustomerCart } from 'src/app/model/customerCart';
import { Product } from 'src/app/model/product';
import { CustomerHomeService } from '../customer-home.service';
import { CustomerHomeComponent } from '../customer-home.component';
import { Customer } from 'src/app/model/customer';
import { CartProduct } from 'src/app/model/cartProduct';
import { CustomerCartComponent } from '../customer-cart/customer-cart.component';
import { CustomerCartService } from '../customer-cart/customer-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  @Input()
  selectedProduct!: Product;
  errorMessage!: string;
  successMessage!: string;
  productId: any;
  operation !: string;
  loggedInCustomer: any;
  cart: CustomerCart[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
  cartToAdd: CustomerCart = new CustomerCart();
  cartProd: CartProduct = new CartProduct();
  prod: Product = new Product();

  constructor(private customerCommonService: CustomerHomeService, private custHome: CustomerHomeComponent, private custCartService: CustomerCartService) { }

  ngOnInit(): void {
    this.custHome.getCustomerCart();
    this.loggedInCustomer = JSON.parse(sessionStorage.getItem('customer') || "{}");
    
    this.customerCommonService.getCustomerCart(this.loggedInCustomer.emailId);
    
  }

  addToCart() {
    this.successMessage = "";
    this.errorMessage = "";
    let alreadyAddedToCart: boolean = false;
    

  
    // this.cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    if (this.cart == null) {
      this.cart = [];
    }
      
    let customer: Customer = JSON.parse(sessionStorage.getItem("customer") || "{}");
    // this.cartToAdd = new CustomerCart();
    // this.cartProd: CartProduct = new CartProduct();
  
    
    this.prod.productId = this.selectedProduct.productId;  
    this.selectedProduct.quantity = 1;
  
    this.cartProd.product = this.prod;
    this.cartProd.quantity = 1;
    this.cartToAdd.customerEmailId = customer.emailId;
  
     console.log(this.cartProd);
    if(!this.cartToAdd.cartProducts){
      this.cartToAdd.cartProducts = [];
    }
    this.cartToAdd.cartProducts.push(this.cartProd); // Now, cartProduct is initialized properly before adding products to it
    console.log(this.cartToAdd);
  
    if (this.cart.length > 0) {
      alreadyAddedToCart = (this.cart.filter(c => c.product.productId == this.selectedProduct.productId)).length != 0;
    }
  
    if (alreadyAddedToCart) {
      this.errorMessage = "Already added to Cart. Go to cart for modifying your selection."
    } else {
      this.customerCommonService.addProductToCart(this.cartToAdd).subscribe(
        (response) => {
          this.successMessage = "Product added to cart successfully. Cart ID: " + response;
          this.cart.push(this.cartToAdd);
          this.customerCommonService.updateCartList(this.cart);
        },
        (error) => {
          this.errorMessage = "Failed to add product to cart. Please try again later.";
          console.error('Error occurred while adding product to cart:', error);
        }
      )
    }
  }

  alter(operation: string) {
    this.successMessage = "";
    this.errorMessage = "";

    this.prod.productId = this.selectedProduct.productId;  
    this.selectedProduct.quantity = 1;
    this.cartProd.product.productId = this.selectedProduct.productId;
    this.cartProd.product = this.prod;
    this.cartToAdd.quantity = this.selectedProduct.quantity;

    if(operation == '-'){
      this.selectedProduct.quantity--;
    }else {
      this.selectedProduct.quantity++;
    }
    
    let loggedInCustomer: any = JSON.parse(sessionStorage.getItem('customer') || "{}");
    this.custCartService.updateProductFromCart(this.cartToAdd, loggedInCustomer.emailId).subscribe(
      message => {
        this.custHome.getCustomerCart();
        this.successMessage = message;
      }, error => this.errorMessage = <any>error
    )
  }

  // incrementQuantity(): void {
  //   this.selectedProduct.quantity++;
  // }

  // // Method to decrement the quantity
  // decrementQuantity(): void {
  //   if (this.selectedProduct.quantity > 1) { // Ensure quantity doesn't go below 1
  //     this.selectedProduct.quantity--;
  //   }
  // }

}
