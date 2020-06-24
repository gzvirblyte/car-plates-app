import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(platesList: any, term: any): any {
    return platesList.filter(function(plate){
      return plate.plateNumber.toLowerCase().includes(term.toLowerCase());
    });
  }

}
