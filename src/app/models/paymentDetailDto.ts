import { Payment } from './payment';

export interface PaymentDetalDto extends Payment {
  firstName: string;
  lastName: string;
  email: string;
}
