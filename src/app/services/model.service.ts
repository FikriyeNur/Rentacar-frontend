import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ModelDetailDto } from '../models/modelDetailDto';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  apiUrl = 'https://localhost:44379/api/models/getalldto';

  constructor(private httpClient: HttpClient) {}

  getModels():Observable<ListResponseModel<ModelDetailDto>>{
   return this.httpClient.get<ListResponseModel<ModelDetailDto>>(this.apiUrl);
  }
}
