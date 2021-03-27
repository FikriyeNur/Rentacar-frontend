import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cartItems: CartItem[];
  carDetails: CarDetailDto[];
  totalRentPrice:number;
  constructor() {}

  ngOnInit(): void {}
}
