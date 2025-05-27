import { ICountry } from '../interfaces/country.interfaces';
import { RESTCountryResponse } from '../interfaces/rest-country.interfaces';

export class CountryMapper {
  public static mapRCountryToCountry(
    rCountries: RESTCountryResponse
  ): ICountry {
    return {
      /* capital: rCountries.capital, */
      capital: rCountries.capital?.join(','),
      cca2: rCountries.cca2,
      flag: rCountries.flag,
      flagSvg: rCountries.flags.svg,
      name: rCountries.translations['spa'].common ?? 'No Spanish Name!',
      population: rCountries.population,
      region: rCountries.region,
      subRegion: rCountries.subregion,
      coatOfArms: rCountries.coatOfArms.svg,
    };
  }

  public static mapRCountryArrayToCountryArray(
    rCountArr: RESTCountryResponse[]
  ): ICountry[] {
    /* Mejor Opcion :D */
    return rCountArr.map(this.mapRCountryToCountry);
    /* return rCountArr.map((country) => this.mapRCountryToCountry(country)); */
  }
}
