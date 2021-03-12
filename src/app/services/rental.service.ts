import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponceModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44379/api/rentals/getalldto';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalResponceModel> {
    return this.httpClient.get<RentalResponceModel>(this.apiUrl);
  }
}
