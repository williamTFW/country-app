import { Component } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { TableListComponent } from '../../components/table-list/table-list.component';

@Component({
  selector: 'app-by-capitals',
  imports: [SearchInputComponent, TableListComponent],
  templateUrl: './by-capitals-page.component.html',
})
export class ByCapitalsComponent {
  onSearch(txtVal: string) {
    console.log(txtVal);
  }
}
