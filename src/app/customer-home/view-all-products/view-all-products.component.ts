import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ViewAllProductService } from './view-all-product.service';
import { CustomerCart } from 'src/app/model/customerCart';
import { CustomerHomeService } from '../customer-home.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.scss']
})
export class ViewAllProductsComponent implements OnInit {

  successMessage!: string;
  errorMessage!: string;
  productList!: Product[];

  searchText!: string;

  viewDetails: boolean = false;
  selectedProduct!: Product;

  productListToDisplay: Product[] = [];
  constructor (private viewAllProductService: ViewAllProductService,
    private customerHomeService: CustomerHomeService,
    private router: Router,
    private route: ActivatedRoute) {
      

  }

  ngOnInit () {
    this.getAllProduct();
  }

  getAllProduct() {
    this.viewAllProductService.getAllProduct()
      .subscribe(products => {
        this.productList = products;
        this.productListToDisplay = this.productList;
      })
  }

  setSelectedProduct(product: Product) {
    this.viewDetails = true;
    this.selectedProduct = product;
  }


  search(){
    this.searchText = this.searchText.toLowerCase()
    if(this.searchText){
      this.productListToDisplay = this.productList.filter(product => {
        return product.category.toLowerCase().indexOf(this.searchText) != -1 || product.name.toLowerCase().indexOf(this.searchText) != 1
       });
    } else {
      this.productListToDisplay = this.productList;
    }
  }

  clear() {
    this.productListToDisplay = this.productList;
    this.searchText = "";
  }

  addToCart(product: Product) {
    this.successMessage = "";
    this.errorMessage = "";
    let cart: CustomerCart = new CustomerCart();
    let customer: any = sessionStorage.getItem("customer");

    cart.customerEmailId = customer.emailId;
    cart.cartProducts = customer.selectedProduct;
    product.quantity = 1;

    this.viewAllProductService.addToCart(cart).subscribe(
      cartFromDB => {
        this.successMessage = "Success Message" + cartFromDB;
      },
      error => {
        this.errorMessage = <any>error;
      }
    )
  }

}
