import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReferenceDataService } from '../service/reference-data.service';

@Pipe({
  name: 'refData',
})
export class ReferenceDataPipe implements PipeTransform {
  constructor(private refDataService: ReferenceDataService) {}
  transform(key: string, refType: string): Observable<any> | null {
    switch (refType) {
      case 'category': {
        return this.refDataService.getAllCategories().pipe(
          map((allCategories) => {
            return allCategories.filter((item) => item.key === key).map((res) => res.value);
          })
        );
      }

      case 'language': {
        return this.refDataService.getAllLanguages().pipe(
          map((allLanguages) => {
            return allLanguages.filter((item) => item.key === key).map((res) => res.value);
          })
        );
      }
    }

    return null;
  }
}
