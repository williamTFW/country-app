import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './app-footer.component.html',
})
export class AppFooterComponent {
  public year: number = new Date().getFullYear();
}
