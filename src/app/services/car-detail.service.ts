import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  apiUrl = 'https://localhost:44379/api/cars/getbyiddto?id=';

  constructor(private httpClient: HttpClient) {}

  getCarDetails(carId: number): Observable<ItemResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + carId;
    return this.httpClient.get<ItemResponseModel<CarDetailDto>>(newPath);
  }
}
