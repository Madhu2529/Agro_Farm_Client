import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, Subject, catchError, throwError } from 'rxjs';
import { CustomerCart } from '../model/customerCart';
import { Card } from '../model/card';
import { Customer } from '../model/customer';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomeService {
  temp!: any;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
    this.temp = JSON.stringify(sessionStorage.getItem('customer'));
   }

   private cartList = new Subject<CustomerCart[]>();
   updatedCartList = this.cartList.asObservable();

   private cardList = new Subject<Card[]>();
   updatedCardList = this.cardList.asObservable();

   customerdata!: Customer;
   public loggedInCustomer = new Subject<Customer>();

   updatedCustomer() {
    let customerData: any = sessionStorage.getItem('customer');
    customerData = JSON.parse(customerData)

    this.loggedInCustomer.next(customerData)
   }

   updatedCustomerDetails(customer: Customer) {
    this.loggedInCustomer.next(customer);
   }

   updateCartList(cartList: CustomerCart[]){
    this.cartList.next(cartList);
   }

   updateCardList(cardList: Card[]){
    this.cardList.next(cardList);
   }

   addProductToCart(cart: CustomerCart){
    // write your code here to backend that the post requst to backend api to add the item to the customer cart
    let url: string = environment.customerCartUrl + "/addProductsToCart";
    
    return this.http.post(url,cart, {headers: this.headers, responseType: 'text' as 'json'})
      .pipe(catchError(this.handleError));
   }

   getCustomerCart(emailId: string): Observable<CustomerCart[]> {
    let url: string = environment.customerCartUrl + "/customer/" + emailId + "/products";
    return this.http.get<CustomerCart[]>(url)
      .pipe(catchError(this.handleError));
   }

   private handleError(handleError: HttpErrorResponse) {
    console.log(handleError)
    let errMsg: string = '';

    if(handleError.error instanceof Error){
      errMsg = handleError.error.message;
      console.log(errMsg)
    }
    else if(typeof handleError.error === 'string'){
      errMsg = JSON.parse(handleError.error).errorMessage
    }
    else{
      if(handleError.status == 0){
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = handleError.error.errorMessage;
      }
    }

    return throwError(errMsg);
  }

}
