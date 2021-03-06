import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44379/api/cars/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'getalldto';
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarById(carId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'getbyiddto?id=' + carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetails(carId: number): Observable<SingleResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'getbyiddto?id=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'getfilterbrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDetailDto>> {
    let newPath = this.apiUrl + 'getfiltercolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  add(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: Car): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<SingleResponseModel<Car>>(newPath, car);
  }

  delete(car: Car): Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<SingleResponseModel<Car>>(newPath, car);
  }
}
