import { RentalDetailDto } from "./rentalDetailDto";
import { ResponseModel } from "./responseModel";

export interface RentalResponceModel extends ResponseModel{
    data:RentalDetailDto[]
;}