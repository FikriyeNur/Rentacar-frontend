export interface Payment {
  paymentId?: number;
  rentalId?: number;
  userId?: number;
  carNameSurname: string;
  cardNumber: string;
  cardExpirationDateMonth: number;
  cardExpirationDateYear: number;
  cardCvv: string;
  cardLimit:number;
}
