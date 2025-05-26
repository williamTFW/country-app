import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input.required();
  btnTxt = input.required();
  value = output<string>();
  debounceTime = input(800);
  inpuyValue = signal<string>('');

  /* Funcion creada para gestionar tiempos en los que se pueden enviar consultas */
  debounceEfect = effect((onCleanup) => {
    const value = this.inpuyValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
