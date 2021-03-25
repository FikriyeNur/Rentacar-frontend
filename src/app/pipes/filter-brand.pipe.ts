import { Pipe, PipeTransform } from '@angular/core';
import { CarDetailDto } from '../models/carDetailDto';

@Pipe({
  name: 'filterBrand'
})
export class FilterBrandPipe implements PipeTransform {

    transform(value: CarDetailDto[], filterText: string): CarDetailDto[] {
      filterText = filterText ? filterText.toLocaleLowerCase() : null;
      return filterText? value.filter(
            (c: CarDetailDto) =>
              c.brandName.toLocaleLowerCase().indexOf(filterText) !== -1
          )
        : value;
    }
  }
