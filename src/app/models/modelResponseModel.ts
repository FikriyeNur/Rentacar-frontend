import { ModelDetailDto } from "./modelDetailDto";
import { ResponseModel } from "./responseModel";

export interface ModelResponseModel extends ResponseModel {
  data: ModelDetailDto[];
}