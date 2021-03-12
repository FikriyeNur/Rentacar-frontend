import { Model } from "./model";
import { ResponseModel } from "./responseModel";

export interface ModelResponseModel extends ResponseModel {
  data: Model[];
}