import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDetailDto } from '../models/customerDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44379/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getCustomers():Observable<ListResponseModel<CustomerDetailDto>>{
    let newPath=this.apiUrl +"getalldto";
    return this.httpClient.get<ListResponseModel<CustomerDetailDto>>(newPath);
  }

  getCustomerById(customerId:number):Observable<SingleResponseModel<CustomerDetailDto>>{
    let newPath= this.apiUrl+"getbyid?id="+customerId;
    return this.httpClient.get<SingleResponseModel<CustomerDetailDto>>(newPath);
  }
}
