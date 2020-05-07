import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterBy: any, filterValue: any, resultStatus?: any): any[] {
    if (filterValue === undefined) {
      return value;
    }

    if (typeof filterValue === 'string') {
      if (!filterValue.length) {
        return value;
      }
      
      const filteredValue = value.filter(el => el[filterBy].includes(filterValue));
      resultStatus = !filteredValue.length;

      return filteredValue;
    }

    return value.filter((el) => el[filterBy] === filterValue);
  }

}
