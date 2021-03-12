import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelResponseModel } from '../models/modelResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  apiUrl = 'https://localhost:44379/api/models/getalldto';

  constructor(private httpClient: HttpClient) {}

  getModels():Observable<ModelResponseModel>{
   return this.httpClient.get<ModelResponseModel>(this.apiUrl);
  }
}
