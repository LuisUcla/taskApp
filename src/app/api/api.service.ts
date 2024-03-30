import { Injectable, effect, inject, signal } from '@angular/core';
import { Task } from '../shared/models/task.model';
import { Status } from '../shared/enum/status.enum';
import { StoreDataBaseService } from '../shared/services/store-data-base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly storeService = inject(StoreDataBaseService)
  public tasks = signal<Task[]>([])

  constructor() {
    this.getTasks();
  }

  getTasks()  {
    const tasksDB = this.storeService.getStore();
    this.tasks.set(tasksDB);
  }

  addTask(newTask: Task) {
    const tasks = this.storeService.getStore();
    this.tasks.set([...tasks, newTask])
    this.storeService.setStore(this.tasks());
  }

  editTask(id: number, task: Task) {
    const index = this.tasks().findIndex(task => task.id == id);
   
    if (index != -1) {
      this.tasks()[index].title = task.title;
      this.tasks()[index].description = task.description;
      this.storeService.setStore(this.tasks());
    }
  }

  deleteTask(id: number) {
    const tasks =  this.storeService.getStore();
    this.tasks.set(tasks.filter(task => task.id != id));
    this.storeService.setStore(this.tasks());
  }

  completeTask(id: number) {
    const index = this.tasks().findIndex(task => task.id == id);

    if (index != -1) {
      this.tasks()[index].status = this.tasks()[index].status == Status.COMPLETED 
      ? Status.PENDING
      : Status.COMPLETED;
     
      this.storeService.setStore(this.tasks())
    }
  } 
}