import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderService {
  temp!: any;
  constructor(private http: HttpClient) { }

  getOrders(emailId: any): Observable<any> {
    let url: string = environment.orderAPIUrl + "/customer/" + emailId + "/orders";
    return <Observable<any>>(this.http.get(url).pipe(catchError(this.handleError)));
  }

  private handleError(handleError: HttpErrorResponse) {
    console.log(handleError)
    let errMsg: string = '';

    if (handleError.status == 400) {
      errMsg = "The request can not be proccessed at the moment. Please try again later or connect with admin!!";

    } else if (handleError.status == 404) {
      errMsg = "The resources you are looking for is not available. Please try again later or connect with admin!!";
    } else {
      if (handleError.error instanceof Error) {
        errMsg = handleError.error.message;
        console.log(errMsg)
      }
      else if (typeof handleError.error === 'string') {
        alert("I am in error");
        errMsg = JSON.parse(handleError.error).errorMessage
      }
      else {
        if (handleError.status == 0) {
          errMsg = "A connection to back end can not be established.";
        } else {
          errMsg = handleError.error.errorMessage;
        }
      }
    }
    return throwError(errMsg);
  }

}
