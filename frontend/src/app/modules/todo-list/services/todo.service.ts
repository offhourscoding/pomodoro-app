import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})

// TODO: Persist data with localstorage

export class TodoService {

  private todoListSubject: BehaviorSubject<Todo[]>;
  public currentTodoList: Observable<Todo[]>;

  constructor() { 
    this.todoListSubject = new BehaviorSubject<Todo[]>([]);
    this.currentTodoList = this.todoListSubject.asObservable();
  }

  // Get Todos
  public get todoList(): Todo[] {
    return this.todoListSubject.value;
  }

  // Add Todo
  addTodo(task: string) {
    let todo: Todo = {
      id: this.todoList.length + 1,
      task: task,
      order: this.todoList.length + 1,
      completed: 0
    }

    let todos = this.todoList;
    todos.push(todo);
    this.updateTodoList(todos);
  }


  // Edit Todo

  // Edit complete status
  editComplete(id: number) {
    let index = this.findTodoIndex(id);
    if (index !== -1) {
      let todos = this.todoList;
      todos[index].completed ? todos[index].completed = 0 : todos[index].completed = 1;
      this.updateTodoList(todos);
    }
  }


  // Edit list order
  editOrder(id: number, direction: string) {
    let index = this.findTodoIndex(id);
    if (index !== -1) {
      let todos = this.todoList;

      if (direction === 'up') {
        // Lower the order number
        todos[index].order = index;
        todos[index-1].order = index + 1;
      } else if (direction === 'down') {
        // Increase the order number
        todos[index].order = index + 1;
        todos[index + 1].order = index;
      }
      this.updateTodoList(todos);
    }
  }

  
  // Delete Todo
  remove(id: number) {
    let index = this.findTodoIndex(id);
    if (index > -1) {
      let todos = this.todoList;
      todos.splice(index, 1);
      this.updateTodoList(todos);
    }
  }


  //// Helpers ////
  
  // Reorder
  private reorderTodoList(todos: Todo[]): Todo[] {
    todos = _.orderBy(todos, ['completed', 'order']);

    for(let i = 0; i < todos.length; i++) {
      todos[i].order = i + 1;
    }
    return todos;
  }


  // Find array index of a Todo
  private findTodoIndex(id: number): number {
    let todos = this.todoList;
    return todos.findIndex(todo => todo.id === id);
  }

  // Update TodoList
  private updateTodoList(todos: Todo[]) {
    todos = this.reorderTodoList(todos);
    this.todoListSubject.next(todos);
  }
}
