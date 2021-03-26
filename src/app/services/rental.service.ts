import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';

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
