import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { CountryService } from './../../services/country.service';
import { MsgAlertComponent } from '../../components/msg-alert/msg-alert.component';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, TableListComponent, MsgAlertComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryComponent {
  CountryService = inject(CountryService);
  query = signal<string>('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.CountryService.searchByCountry(request.query.toLowerCase())
      );
    },
  });
}
