import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryPageInformationComponent } from './country-information-page/country-information-page.component';

@Component({
  selector: 'country-page',
  imports: [NotFoundComponent, CountryPageInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  // Forma alternativa para tomar parametros que se pasan por la url
  // countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryServices = inject(CountryService);

  countryResource = rxResource({
    request: () => ({ code: this.countryCode }),
    loader: ({ request }) => {
      return this.countryServices.searchCountryByAlphaCode(request.code);
    },
  });
}
