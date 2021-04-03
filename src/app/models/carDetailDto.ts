import { Car } from "./car";

export interface CarDetailDto extends Car {
  brandName: string;
  modelName: string;
  colorName: string;
  imagePath: string;
}
