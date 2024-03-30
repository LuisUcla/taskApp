import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass],
  template: `
  <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-end w-100 position-fixed top-0 end-0 p-3">
    <div
    [ngClass]="{'show': toast().show, 'bg-success': toast().success, 'bg-danger': !toast().success}"
      class="toast align-items-center text-white border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{toast().message}}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>`
})
export class ToastComponent {
  toast = input.required<any>();
}
