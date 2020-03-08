import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Todo } from '../../interfaces';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @ViewChild('todoInput', { static: false }) todoInput: ElementRef;
  todoList: Todo[];
  isSubmitted = false;
  isTodoInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }


  //// Button Handlers ////
  
  onMoveUpClick(id: number) {
    this.todoService.editOrder(id, 'up');
    this.getTodos();
  }


  onMoveDownClick(id: number) {
    this.todoService.editOrder(id, 'down');
    this.getTodos();
  }


  onDeleteClick(id: number) {
    this.todoService.remove(id);
    this.getTodos();
  }


  //// Event Listeners ////

  onChangeCompleteEvent(id: number) {
    this.todoService.editComplete(id);
    this.getTodos();
  }


  onAddTodoEvent(task: string) {
    this.isSubmitted = true;
    if (!task) {
      this.isTodoInvalid = true;
      return;
    }

    this.todoService.addTodo(task);
    this.getTodos();
    this.resetTodoInput(); 
    return;
  }


  //// Helpers ////

  getTodos() {
    this.todoList = this.todoService.todoList;
    console.log(this.todoList);
  }


  resetTodoInput() {
    this.isSubmitted = false;
    this.isTodoInvalid = false;
    this.todoInput.nativeElement.value = '';
  }


  findTodoIndex(id: number): number {
    return this.todoList.findIndex(todo => todo.id === id);
  }


  reorderTodoList() {
    this.todoList = _.orderBy(this.todoList, ['completed', 'order']);

    for(let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].order = i + 1;
    }

    console.log(this.todoList);
  }
}
