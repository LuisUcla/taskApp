import { Component, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api/api.service';
import { Task } from './shared/models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { Status } from './shared/enum/status.enum';
import { CardTaskComponent } from './components/card-task/card-task.component';
import { ButtonsFilterComponent } from './components/buttons-filter/buttons-filter.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, ToastComponent, CardTaskComponent, ButtonsFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('closebutton') closebutton;
  @ViewChild('modal') modal;
  taskForm: FormGroup;

  private readonly tasksService = inject(ApiService)
  private readonly fb = inject(FormBuilder)

  tasks = this.tasksService.tasks; // -> signal
  modalTitle = signal<string>('Add new Task');
  id = signal<number | undefined>(undefined);
  toast = signal<any>({ show: false, message: '', success: true });
  status = signal<string>('all');
  
  constructor() {
    this.Form();
  }

  private Form() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  save() {
    if (this.taskForm.valid) {
      if (this.id()) { // edit
        const taskEdit: Task = {
          ...this.taskForm.value,
          title: this.taskForm.get('title').value,
          description: this.taskForm.get('description').value
        }

        this.editTask(this.id(), taskEdit);
        this.messageToast('Edit task successfull..'); 
        this.id.set(undefined);
      } else { // create new task
        this.addTask()
        this.messageToast('Add new task successfull..')
      }
      this.closeModal();
    } else {
      for (const i in this.taskForm.controls) {
        this.taskForm.controls[i].markAsDirty();
        this.taskForm.controls[i].updateValueAndValidity();
      }
    }
  }

  addTask() {
    this.tasksService.getTasks()
    const task: Task = {
      id: this.tasks().length > 0 ? this.tasks()[this.tasks().length - 1].id + 1 : 1,
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      status: Status.PENDING // --> default
    };
    
    this.tasksService.addTask(task);
  }

  editTask(id: number, task: Task) {
    this.tasksService.editTask(id, task);
  }

  delete(id: number) {
    this.tasksService.deleteTask(id);
    this.messageToast('Delete task successfull...')
  }

  taskCompleted(id: number) {
    this.tasksService.getTasks()
    this.tasksService.completeTask(id);
  }

  openEdit(id: number) {
    this.modalTitle.set('Edit task');
    this.id.set(id);
    const task = this.tasks().find(task => task.id == id);
    this.taskForm.setValue({
      'title': task.title,
      'description': task.description
    })
    this.modal.nativeElement.click();
  }

  closeModal() {
    this.closebutton.nativeElement.click();
    this.taskForm.reset();
    this.modalTitle.set('Add new Task');
  }

  onChangeFilter(value: string) {
    this.status.set(value)
    this.tasksService.getTasks();
    const tasksFilter = this.tasksService.tasks().filter(task => value == 'all' ? true : task.status == value);
    this.tasks.set(tasksFilter);
  }
  
  messageToast(message: string) { 
    this.toast.set({ show: true, message, success: true })
    setTimeout(() => {
      this.toast.set({ show: false })
    }, 3000);
  }
}