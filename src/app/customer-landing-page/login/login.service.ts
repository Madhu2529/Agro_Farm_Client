import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Customer } from "src/app/model/customer";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {

  }

  login(customer: Customer): Observable<Customer> {
    // Implement your authentication logic here, e.g., make an HTTP request to the server
    const url = environment.customerAPIUrl + '/login';

    return this.http.post<Customer>(url, customer, { headers: this.headers })
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
