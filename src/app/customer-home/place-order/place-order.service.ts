import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from 'src/app/model/card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  constructor(private http: HttpClient) { }

  getCards(customerEmailId: any, cardType: string) {
    let url: string = environment.cardAPIUrl + "/customer/" + customerEmailId + "/card-type/" + cardType;
    return this.http.get<Card[]>(url).pipe(catchError(this.handleError));
  }

  placeOrder(data: any) {
    let url: string = environment.orderAPIUrl + "/place-order";
    return this.http.post(url, data,{responseType: "text" as "json"})
      .pipe(catchError(this.handleError));  
  }

  payForOrder(customerEmailId: any, orderId: any, data: any) {
    // make a post request to respective backend api to pay for the order
    let url: string = environment.cardAPIUrl + "/customer/" + customerEmailId + "/order/" + orderId;
    return this.http.post(url, data, {responseType: "text"})
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
