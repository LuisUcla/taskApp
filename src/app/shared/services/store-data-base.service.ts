import { Injectable, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreDataBaseService {

  constructor() {}

  setStore(tasks: any) {
    localStorage.setItem("task", JSON.stringify(tasks));
  }

  getStore() {
    const tasksDB = localStorage.getItem("task");
    return tasksDB ? JSON.parse(tasksDB) : [];  
  }
}
