import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CustomerCart } from 'src/app/model/customerCart';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewAllProductService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    
    let url = environment.customerProductAPI + "/products";
    return this.http.get<Product[]>(url)
      .pipe(catchError(this.handleError));
  }

  addToCart(cart: CustomerCart): Observable<CustomerCart> {
    return this.http.post<CustomerCart>("http://localhost:8080/AgroFarm/cart-api/addProductsToCart",cart)
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
