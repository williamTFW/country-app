import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { map } from 'rxjs';
import { RESTCountryResponse } from '../interfaces/rest-country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http: HttpClient = inject(HttpClient);

  searchByCapital(query: string) {
    let queryLowerCa: string = query.toLowerCase();

    return this.http
      .get<RESTCountryResponse[]>(
        `${environment.apiCountryUrl}/capital/${queryLowerCa}`
      )
      .pipe(
        map((resp) => CountryMapper.mapRCountryArrayToCountryArray(resp))
        /* map(CountryMapper.mapRCountryArrayToCountryArray) */
      );
  }
}
