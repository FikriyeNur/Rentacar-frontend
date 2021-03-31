import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { PaymentDetalDto } from '../models/paymentDetailDto';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  
  apiUrl = 'https://localhost:44379/api/payments/';
  constructor(private httpClient: HttpClient) {}

  getPayment(): Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  getPaymentDetailDto(): Observable<ListResponseModel<PaymentDetalDto>> {
    let newPath = this.apiUrl + 'getalldto';
    return this.httpClient.get<ListResponseModel<PaymentDetalDto>>(newPath);
  }

  getPaymentByIdDto(paymentId: number) {
    let newPath = this.apiUrl + 'getbyiddto?paymentId=' + paymentId;
    return this.httpClient.get<SingleResponseModel<PaymentDetalDto>>(newPath);
  }

  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }
}
