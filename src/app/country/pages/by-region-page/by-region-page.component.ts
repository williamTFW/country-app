import { Component, inject, signal } from '@angular/core';
import { TableListComponent } from '../../components/table-list/table-list.component';
import { Region } from '../../interfaces/region-type';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { MsgAlertComponent } from '../../components/msg-alert/msg-alert.component';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  imports: [TableListComponent, MsgAlertComponent],
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Antarctic',
    'Europe',
    'Oceania',
  ];

  selectedRegion = signal<Region | null>(null);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  countryResource = rxResource({
    request: () => ({ region: this.selectedRegion() }),
    loader: ({ request }) => {
      if (!request.region) return of([]);
      return this.countryService.searchByRegion(request.region);
    },
  });
}
