import { Rental } from "./rental";

export interface RentalDetailDto extends Rental{
    companyName:string;
    userFirstName:string;
    userLastName:string;
    brandName:string;
    modelName:string;
    rentDate:Date;
    returnDate:Date; 
    dailyPrice:number; 
}