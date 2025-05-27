import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { CountryService } from './../../services/country.service';
import { MsgAlertComponent } from '../../components/msg-alert/msg-alert.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [SearchInputComponent, TableListComponent, MsgAlertComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryComponent {
  countryService = inject(CountryService);
  activateRoute = inject(ActivatedRoute);
  route = inject(Router);
  queryParam = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal<string>(() => this.queryParam);

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      this.route.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        },
      });
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query.toLowerCase())
      );
    },
  });
}
