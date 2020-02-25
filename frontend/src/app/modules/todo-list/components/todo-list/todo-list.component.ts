import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];

  constructor() { }


  ngOnInit() {
    this.todoList = [
      {
        id: 1,
        task: 'Task 1',
        order: 4,
        completed: 0
      },
      {
        id: 2,
        task: 'Task 2',
        order: 3,
        completed: 0
      },
      {
        id: 3,
        task: 'Task 3',
        order: 2,
        completed: 0
      },
      {
        id: 4,
        task: 'Task 4',
        order: 1,
        completed: 0
      }
    ];

    this.reorderTodoList();
  }

  //// Button Handlers ////
  
  deleteClick(id: number) {
    let index = this.findTodoIndex(id);
    if (index > -1) {
      this.todoList.splice(index, 1);
      this.reorderTodoList();
      console.log(this.todoList);
    }
  }


  //// Event Listeners ////

  changeCompleteEvent(id: number) {
    let index = this.findTodoIndex(id);
    if (index !== -1) {
      this.todoList[index].completed ? this.todoList[index].completed = 0 : this.todoList[index].completed = 1;
      this.reorderTodoList();
    }
  }


  //// Helpers ////
  
  findTodoIndex(id: number): number {
    return this.todoList.findIndex(todo => todo.id === id);
  }

  reorderTodoList() {
    this.todoList = _.orderBy(this.todoList, ['completed', 'order']);

    for(let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].order = i + 1;
    }
  }
}
