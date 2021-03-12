import { Rental } from "./rental";
import { ResponseModel } from "./responseModel";

export interface RentalResponceModel extends ResponseModel{
    data:Rental[]
;}