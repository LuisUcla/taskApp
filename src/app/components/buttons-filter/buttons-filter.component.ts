import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-filter',
  standalone: true,
  imports: [],
  template:
  `
    <div (change)="onChangeFilter($event)" class="btn-group mb-4 pt-5 d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="all" autocomplete="off" checked><!-- Default -->
      <label class="btn btn-outline-success" for="btnradio1">All</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="pending" autocomplete="off">
      <label class="btn btn-outline-success" for="btnradio2">Pending</label>

      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" value="completed" autocomplete="off">
      <label class="btn btn-outline-success" for="btnradio3">Completed</label>
    </div>
    
    <style>
      .btn-group {
        padding: 0 5rem 0 5rem;
        display: flex;
      }
    </style>
  `  
})
export class ButtonsFilterComponent {
  @Output() filter = new EventEmitter<string>()
  

  onChangeFilter(event) {
    const value = event.target.value
    this.filter.emit(value)
  }
}
