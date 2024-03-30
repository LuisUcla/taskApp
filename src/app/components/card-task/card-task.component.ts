import { Component, EventEmitter, Output, ViewChild, input } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [NgClass],
  template: `<div 
  class="card shadow" 
  [ngClass]="{ 
    'border border-warning bg-warning bg-opacity-10': task().status == 'pending',
    'border border-secondary bg-secondary opacity-50 bg-gradient bg-opacity-25': task().status == 'completed'
  }">
  <div class="card-body">
    <div class="d-flex justify-content-between">
      <h5
        [ngClass]="task().status == 'completed' ? 'text-decoration-line-through text-danger' : ''"
        class="card-title fw-bold"
      >
        {{ task().title }}
      </h5>
      <input 
        (change)="taskCompleted($event)" 
        class="form-check-input text-success mt-0" 
        type="checkbox" 
        [value]="task().id" 
        [checked]="task().status == 'completed' ? true : false" 
        id="defaultCheck1"
      >
    </div>

    <p 
      [ngClass]="task().status == 'completed' ? 'text-decoration-line-through text-danger' : ''" 
      class="card-text mb-1"
    >
      {{ task().description }}
    </p>

    <div class="d-flex justify-content-between align-items-center">
      <small class="text-secondary text-capitalize">{{ task().status }}</small>
      <div>
        <button [disabled]="task().status == 'completed'" type="button" class="btn btn-link ps-1" (click)="openEdit(task().id)">
          <img src="../assets/icons/edit.svg" alt="">
        </button>
        <button type="button" class="btn btn-link p-0" (click)="delete(task().id)">
          <img src="../assets/icons/trash.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  input[type='checkbox'] { 
    font-size: 1.5rem;
 }
</style>
`,
})
export class CardTaskComponent {
  task = input.required<Task>();
  @Output() opendEditModal = new EventEmitter<number>()
  @Output() taskCompletedEv = new EventEmitter<any>()
  @Output() deleteEv = new EventEmitter<number>()
  
  delete(id: number) {
    this.deleteEv.emit(id)
  }

  taskCompleted(event) {
    const id = event.target.value;
    this.taskCompletedEv.emit(id)
  }

  openEdit(id: number) {
    this.opendEditModal.emit(id)
  }
}
