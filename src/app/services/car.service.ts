import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44379/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getalldto';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarById(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getbyiddto?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getfilterbrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'cars/getfiltercolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getEconomicCars():Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl+ "cars/geteconomiccars";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
}
