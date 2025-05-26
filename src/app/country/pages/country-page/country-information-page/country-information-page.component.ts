import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICountry } from 'src/app/country/interfaces/country.interfaces';

const curDate = new Date();
console.log(curDate.toDateString());
console.log(curDate.toISOString());
console.log(curDate.toJSON());
console.log(curDate.toLocaleString());
console.log(curDate.toLocaleTimeString());
console.log(curDate.toString());
console.log(curDate.toTimeString());
console.log(curDate.toUTCString());

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information-page.component.html',
})
export class CountryPageInformationComponent {
  country = input.required<ICountry>();
  currentYear = new Date().toDateString();
}
