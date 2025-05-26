import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { environment } from '@environments/environments';
import { RESTCountryResponse } from '../interfaces/rest-country.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { ICountry } from '../interfaces/country.interfaces';
import { Region } from '../interfaces/region-type';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http: HttpClient = inject(HttpClient);
  private queryCacheCapital = new Map<string, ICountry[]>();
  private queryCacheCountry = new Map<string, ICountry[]>();
  private queryCacheRegion = new Map<Region, ICountry[]>();

  searchByCapital(query: string) {
    let queryLowerCa: string = query.toLowerCase();

    if (this.queryCacheCapital.has(queryLowerCa)) {
      return of(this.queryCacheCapital.get(queryLowerCa) ?? []);
    }

    console.log('pasando el filtro de si existe en la bd');

    return this.http
      .get<RESTCountryResponse[]>(
        `${environment.apiCountryUrl}/capital/${queryLowerCa}`
      )
      .pipe(
        map((resp) => CountryMapper.mapRCountryArrayToCountryArray(resp)),
        tap((countries) => this.queryCacheCapital.set(queryLowerCa, countries)),
        delay(400),
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

    if (this.queryCacheCountry.has(queryLowCas)) {
      return of(this.queryCacheCountry.get(queryLowCas) ?? []);
    }

    console.log('Filtro que existe para comporbar cache');

    return this.http
      .get<RESTCountryResponse[]>(
        `${environment.apiCountryUrl}/name/${queryLowCas}`
      )
      .pipe(
        map((respCountry) =>
          CountryMapper.mapRCountryArrayToCountryArray(respCountry)
        ),
        delay(500),
        tap((countries) => this.queryCacheCountry.set(queryLowCas, countries)),
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

  searchByRegion(region: Region) {
    const url = `${environment.apiCountryUrl}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountryResponse[]>(url).pipe(
      map((resp) => CountryMapper.mapRCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      delay(400),
      catchError((err) => {
        console.log(`Error: ${err}`);
        return throwError(
          () => new Error(`No contries found with this region: ${region}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${environment.apiCountryUrl}/alpha/${code}`;
    return this.http.get<RESTCountryResponse[]>(url).pipe(
      map((resp) => CountryMapper.mapRCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((err) => {
        console.log(`Error: ${err}`);
        return throwError(
          () => new Error(`No country found whit this code: ${code}`)
        );
      })
    );
  }
}
