import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44379/api/payments/';
  constructor(private httpCilent: HttpClient) {}

  getPayment(): Observable<ListResponseModel<Payment>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpCilent.get<ListResponseModel<Payment>>(newPath);
  }

  addPayment(payment: Payment) {
    let newPath = this.apiUrl + 'add';
    return this.httpCilent.post<ResponseModel>(newPath, payment);
  }

  addToCart(rental: Rental) {
    let cartItem = new CartItem();
    cartItem.rental = rental;
    CartItems.push(cartItem);
  }

  listCart(): CartItem[] {
    return CartItems;
  }
}
