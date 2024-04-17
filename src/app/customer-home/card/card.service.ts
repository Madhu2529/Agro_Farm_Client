import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Card } from 'src/app/model/card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  getCardsOfCustomer(customerEmailId: any, cardType: any): any {
    let url = environment.cardAPIUrl + '/customer/' + customerEmailId + '/card-type/' + cardType;
    return this.http.get<Card[]>(url)
      .pipe(catchError(this.handleError));
  }

  addCardsOfCustomer(card: Card, customerEmailId: any): Observable<any> {
    const url = environment.cardAPIUrl + '/customer/' + customerEmailId + '/cards';
    return <Observable<any>> this.http.post<Card>(url, card, {headers: this.headers, responseType: 'text' as 'json'})
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
