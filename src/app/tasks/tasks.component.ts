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
  sortValue: "asc"|"desc" = "desc";
  isSearchHaveNotResults: Boolean = false;

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
    this.taskService.addTask(newTask).subscribe(() => this.getTasks());
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task._id).subscribe(() => this.getTasks());
  }

  edit(task){
    this.editTask = task;
  }

  update(task: Task){
    if(task){
      this.taskService.updateTask(task).subscribe(() => this.getTasks());
      this.editTask = undefined;
    }
  }

  isTasksNotExist(): Boolean {
    return this.tasks && !this.tasks.length;
  }

  setSearchResultStatus(status) {
    this.isSearchHaveNotResults = status;
  }
}
