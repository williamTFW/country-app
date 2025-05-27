import { Component, inject, linkedSignal, signal } from '@angular/core';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { Region } from '../../interfaces/region-type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { MsgAlertComponent } from '../../components/msg-alert/msg-alert.component';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    antartic: 'Antarctic',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
  };
  return validRegions[queryParam.toLocaleLowerCase()] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [TableListComponent, MsgAlertComponent],
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Antarctic',
    'Europe',
    'Oceania',
  ];

  selectedRegion = linkedSignal<Region>(() =>
    validateQueryParam(this.queryParam)
  );

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      this.route.navigate(['/country/by-region'], {
        queryParams: {
          region: request.region,
        },
      });
      return this.countryService.searchByRegion(request.region);
    },
  });
}
