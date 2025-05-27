import {
  Component,
  inject,
  linkedSignal,
  resource,
  signal,
} from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { MsgAlertComponent } from '../../components/msg-alert/msg-alert.component';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environments';

@Component({
  selector: 'app-by-capitals',
  imports: [SearchInputComponent, TableListComponent, MsgAlertComponent],
  templateUrl: './by-capitals-page.component.html',
})
export class ByCapitalsComponent {
  countryServices = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam: string =
    this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);
  route = inject(Router);

  countryResource = rxResource({
    request: () => ({ query: this.query().toLowerCase() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      console.log(request.query);
      this.route.navigate([`country/by-capital`], {
        queryParams: {
          query: request.query,
        },
      });
      return this.countryServices.searchByCapital(request.query);
    },
  });

  /*Nueva funcion signal(resource) para manejar peticiones y sus errores de manera mas facil
  Utilizando Resource -> permite manejar promesas pero se debe utilizar: firstValueFrom para copnvertir la funcion en una promesa */
  /* countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.countryServices.searchByCapital(request.query)
      );
    },
  }); */

  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<ICountry[]>([]);

  onSearch(query: string) {
    console.log({ query });
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryServices.searchByCapital(query).subscribe({
      next: (countrRes) => {
        this.isLoading.set(false);
        this.countries.set(countrRes);
      },

      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        console.log(err);
        this.isError.set(err);
      },
    });
  } */
}
