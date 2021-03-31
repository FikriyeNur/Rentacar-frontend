import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  rental: Rental;
  apiUrl = 'https://localhost:44379/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentals/getalldto';
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  getDetailById(id: number): Observable<SingleResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentals/getdetailbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<RentalDetailDto>>(newPath);
  }

  isCarAvailable(carId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/iscaravailable?carId=' + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }
}
