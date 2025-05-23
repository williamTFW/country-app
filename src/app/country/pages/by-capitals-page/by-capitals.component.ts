import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { CountryService } from '../../services/country.service';
import { RESTCountryResponse } from '../../interfaces/rest-country.interfaces';
import { ICountry } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-capitals',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-capitals-page.component.html',
})
export class ByCapitalsComponent {
  countryServices = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<ICountry[]>([]);

  onSearch(query: string) {
    console.log({ query });
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    console.log(
      this.countryServices.searchByCapital(query).subscribe((countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
        console.log(countries);
      })
    );
  }
}
