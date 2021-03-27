import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44379/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentals/getalldto';
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }

  getRentalsByCarId(
    carId: number
  ): Observable<SingleResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentals/getdetailbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<RentalDetailDto>>(newPath);
  }

  addRental(
    rental: RentalDetailDto
  ): Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiUrl + 'rentals/getalldto';
    return this.httpClient.post<ListResponseModel<RentalDetailDto>>(
      newPath,
      rental
    );
  }
}
