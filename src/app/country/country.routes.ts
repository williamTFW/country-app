import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';
import { ByCapitalsComponent } from './pages/by-capitals/by-capitals.component';

export const countryRouter: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalsComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];
