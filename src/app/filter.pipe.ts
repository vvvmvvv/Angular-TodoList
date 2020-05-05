import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterBy: any, filterValue: any): any[] {
    if (filterValue === undefined) {
      return value;
    }

    if (typeof filterValue === 'string') {
      if (!filterValue.length) {
        return value;
      }
      
      return value.filter(el => el[filterBy].includes(filterValue));
    }

    return value.filter((el) => el[filterBy] === filterValue);
  }

}
