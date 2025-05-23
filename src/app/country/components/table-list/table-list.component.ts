import { Component, input } from '@angular/core';
import { RESTCountryResponse } from '../../interfaces/rest-country.interfaces';
import { ICountry } from '../../interfaces/country.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'table-list',
  imports: [DecimalPipe],
  templateUrl: './table-list.component.html',
})
export class TableListComponent {
  public countries = input.required<ICountry[]>();
}
