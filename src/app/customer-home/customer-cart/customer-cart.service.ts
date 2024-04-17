import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CustomerCart } from 'src/app/model/customerCart';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {

  private headers = new HttpHeaders({ 'content-type': 'text/plain' });
  constructor(private http: HttpClient) { }

  getCustomerCart(customerEmailId: any) {
    let url: string = environment.customerCartUrl + "/customer/" + customerEmailId + "/products";
    return this.http.get<CustomerCart[]>(url).pipe(catchError(this.handleError));
  }

  updateProductFromCart(cart: CustomerCart, emailId: any) {
    let url: string = environment.customerCartUrl + "/customer/" + emailId + "/product/" + cart.product.productId;
    return this.http.put<string>(url, cart.quantity, { responseType: 'text' as 'json' })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProductFromCart(cart: CustomerCart, customerEmailId: string) {
    let url: string = environment.customerCartUrl + "/customer/" + customerEmailId + "/product/" + cart.product.productId;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  emptyCart(customerEmailId: string) {
    let url: string = environment.customerCartUrl + "/customer/" + customerEmailId + "/products";
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(handleError: HttpErrorResponse) {
    console.log(handleError)
    let errMsg: string = '';

    if (handleError.error instanceof Error) {
      errMsg = handleError.error.message;
      console.log(errMsg)
    }
    else if (typeof handleError.error === 'string') {
      errMsg = JSON.parse(handleError.error).errorMessage
    }
    else {
      if (handleError.status == 0) {
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = handleError.error.errorMessage;
      }
    }

    return throwError(errMsg);
  }
}
