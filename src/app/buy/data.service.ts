import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError, of, map } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl:string = "https://api.externalintegration.payex.com"
  postUrl:string = "https://api.externalintegration.payex.com/psp/paymentorders"
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer 7066f6eef64ecfe4e0a420f79a02b829ebbac0e163a22856a260b3bb380d275e',
      'Content-Type': 'application/json',
    })
  };

  postData = {};
  statusId = "";
  constructor(private httpClient: HttpClient) { 
  }

  paymentOrder (postd = this.postData) {
    return  this.httpClient.post<any>(this.postUrl, postd, this.httpOptions);
  }

  checkPayment(status = this.statusId) : Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + status, this.httpOptions)
  }

}
