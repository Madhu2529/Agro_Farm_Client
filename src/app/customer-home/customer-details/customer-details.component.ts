import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerCart } from 'src/app/model/customerCart';
import { CustomerHomeService } from '../customer-home.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit{
  customer!: Customer;
  errorMessage: string = "";
  successMessage: string = "";
  updating: string = "";
  customerToUpdate!: Customer;

  constructor(private SellerProfileService: CustomerHomeService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.customer = JSON.parse(sessionStorage.getItem('customer') || "{}")
  }

  linkClick(value: string) {
    this.updating = value;
    this.errorMessage = "";
    this.successMessage = "";
  }

  // updateDetails(action: string) {
  //   this.errorMessage = "";
  //   this.successMessage = "";
  //   if(action == "update") {
  //     this.SellerProfileService.updatedCustomerDetails(this.customerToUpdate).subscribe(
  //       (response: string) => {
  //         this.successMessage = response;
  //         this.customer = this.customerToUpdate;
  //         this.SellerProfileService.updatedCustomer();
  //         sessionStorage.setItem("customer", JSON.stringify(this.customerToUpdate));
  //         this.updating = "";
  //         this.router.navigate(["home/details"]);
  //       }
  //     )
  //   }
  // }

  
}
