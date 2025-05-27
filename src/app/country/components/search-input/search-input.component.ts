import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input.required();
  btnTxt = input.required();
  debounceTime = input(800);

  initialValue = input<string>();
  value = output<string>();
  /* La linkedSignal inicia un valor y luego se coporta como una señal normal */
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  /* Funcion creada para gestionar tiempos en los que se pueden enviar consultas */
  debounceEfect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut);
    });
  });
}
