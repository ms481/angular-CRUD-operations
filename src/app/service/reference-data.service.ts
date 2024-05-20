import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, take, map } from 'rxjs';
import { ReferenceData } from '../model/reference-data';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
  url = 'http://localhost:3000';

  private allCategoriesCache!: Observable<Array<ReferenceData>>;
  private allLanguagesCache!: Observable<Array<ReferenceData>>;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Array<ReferenceData>> {
    if (this.allCategoriesCache) {
      return this.allCategoriesCache;
    } else {
      this.allCategoriesCache = this.http
        .get<Array<ReferenceData>>(`${this.url}/categories`)
        .pipe(
          map((data: Array<any>) => {
            return data;
          }),
          take(1),
          shareReplay({ bufferSize: 1, refCount: false })
        );

      return this.allCategoriesCache;
    }
  }

  getAllLanguages(): Observable<Array<ReferenceData>> {
    if (this.allLanguagesCache) {
      return this.allLanguagesCache;
    } else {
      this.allLanguagesCache = this.http
        .get<Array<ReferenceData>>(`${this.url}/languages`)
        .pipe(
          map((data: Array<any>) => {
            return data;
          }),
          take(1),
          shareReplay({ bufferSize: 1, refCount: false })
        );

      return this.allLanguagesCache;
    }
  }
}
