import { Component, OnInit } from '@angular/core';

import {Task} from './task';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TasksService]
})

export class TasksComponent implements OnInit {
  tasks: Task[];
  editTask: Task;
  filterValue: any;
  searchValue: string;

  constructor(private taskService: TasksService) { 
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void{
    this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks));
  }

  add(title:string): void {
    this.editTask = undefined;
    title = title.trim();
    if(!title){
      return;
    }

    const newTask: Task = {title} as Task;
    this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task));
  }

  delete(task: Task): void { 
    this.tasks = this.tasks.filter(h => h !== task);
    this.taskService.deleteTask(task._id).subscribe();
  }

  edit(task){
    this.editTask = task;
  }

  update(task: Task){
    if(task){
      this.taskService.updateTask(task).subscribe(task => {
        this.getTasks();
      });
      this.editTask = undefined;
    }
  }
}
