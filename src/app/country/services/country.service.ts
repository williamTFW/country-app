import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '@environments/environments';
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
        map((resp) => CountryMapper.mapRCountryArrayToCountryArray(resp)),
        catchError((error) => {
          console.log('error: ', error);

          return throwError(
            () =>
              new Error(`No found Countries with this capital: ${queryLowerCa}`)
          );
        })
      );
  }

  searchByCountry(query: string) {
    let queryLowCas = query.toLowerCase();
    return this.http
      .get<RESTCountryResponse[]>(
        `${environment.apiCountryUrl}/name/${queryLowCas}`
      )
      .pipe(
        map((respCountry) =>
          CountryMapper.mapRCountryArrayToCountryArray(respCountry)
        ),
        catchError((err) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                `No countries with this name: ${queryLowCas} were found`
              )
          );
        })
      );
  }
}
