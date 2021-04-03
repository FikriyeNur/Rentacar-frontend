import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44379/api/payments/';
  constructor(private httpClient: HttpClient) {}

  getPayment(): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getPaymentById(
    creditCardId: number
  ): Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'getbyid?' + creditCardId;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

  add(creditCard: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, creditCard);
  }

  update(creditCard: CreditCard): Observable<SingleResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<SingleResponseModel<CreditCard>>(
      newPath,
      creditCard
    );
  }
}
