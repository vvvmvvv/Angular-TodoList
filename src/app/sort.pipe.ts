import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], orderBy: string, direction: 'asc'|'desc' = 'asc'): any[] {
    if(!value || value && !value.length) {
      return value;
    }

    if (direction === 'asc') {
      return value.sort((a, b) => {
        if (a[orderBy] > b[orderBy]) {
          return 1;
        }
        if (a[orderBy] < b[orderBy]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    }

    if (direction === 'desc') {
      return value.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
          return 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    }
  }

}
