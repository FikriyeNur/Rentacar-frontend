export interface CreditCard {
  id?: number;
  cardNameSurname: string;
  cardNumber: string;
  cardExpirationMonth: string;
  cardExpirationYear:string;
  cardSecurityNumber: string;
  cardLimit?:number;
}
