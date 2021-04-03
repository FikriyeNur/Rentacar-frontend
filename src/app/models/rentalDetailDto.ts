import { Rental } from './rental';

export interface RentalDetailDto extends Rental {
  companyName?: string;
  nameSurname?:string;
  brandName: string;
  modelName: string;
  dailyPrice: number;
  totalPrice: number;
}
