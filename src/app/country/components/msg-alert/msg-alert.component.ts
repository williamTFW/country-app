import { Component, input } from '@angular/core';

@Component({
  selector: 'msg-alert',
  imports: [],
  templateUrl: './msg-alert.component.html',
})
export class MsgAlertComponent {
  msgAlert = input.required();
  msgType = input.required();
}
