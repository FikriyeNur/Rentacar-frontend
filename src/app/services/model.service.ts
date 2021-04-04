import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ModelDetailDto } from '../models/modelDetailDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  apiUrl = 'https://localhost:44379/api/models/';

  constructor(private httpClient: HttpClient) {}

  getModels(): Observable<ListResponseModel<ModelDetailDto>> {
    let newPath = this.apiUrl + 'getalldto';
    return this.httpClient.get<ListResponseModel<ModelDetailDto>>(newPath);
  }

  getModelById(modelId: number): Observable<SingleResponseModel<Model>> {
    let newPath = this.apiUrl + 'getbyid?id=' + modelId;
    return this.httpClient.get<SingleResponseModel<Model>>(newPath);
  }

  getByDetailId(
    modelId: number
  ): Observable<SingleResponseModel<ModelDetailDto>> {
    let newPath = this.apiUrl + 'getbyiddto?id=' + modelId;
    return this.httpClient.get<SingleResponseModel<ModelDetailDto>>(newPath);
  }

  add(model: Model): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, model);
  }

  update(model: Model): Observable<SingleResponseModel<Model>> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<SingleResponseModel<Model>>(newPath, model);
  }

  delete(model: Model): Observable<SingleResponseModel<Model>> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<SingleResponseModel<Model>>(newPath, model);
  }
}
