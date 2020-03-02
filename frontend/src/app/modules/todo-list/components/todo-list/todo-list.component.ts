import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Todo } from '../../interfaces';

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.todoList = [];
    this.reorderTodoList();
  }


  //// Button Handlers ////
  
  onMoveUpClick(id: number) {
    let index = this.findTodoIndex(id);
    if (index > -1) {
      this.todoList[index].order = index;
      this.todoList[index-1].order = index + 1;
    }

    this.reorderTodoList();
  }


  onMoveDownClick(id: number) {
    let index = this.findTodoIndex(id);
    if (index > -1) {
      this.todoList[index].order = index + 1;
      this.todoList[index + 1].order = index;
      this.reorderTodoList();
    }
  }


  onDeleteClick(id: number) {
    let index = this.findTodoIndex(id);
    if (index > -1) {
      this.todoList.splice(index, 1);
      this.reorderTodoList();
      console.log(this.todoList);
    }
  }


  //// Event Listeners ////

  onChangeCompleteEvent(id: number) {
    let index = this.findTodoIndex(id);
    if (index !== -1) {
      this.todoList[index].completed ? this.todoList[index].completed = 0 : this.todoList[index].completed = 1;
      this.reorderTodoList();
    }
  }


  onAddTodoEvent(task: string) {
    this.isSubmitted = true;
    if (!task) {
      this.isTodoInvalid = true;
      return;
    }

    this.addTodo(task);
    this.resetTodoInput(); 
    return;
  }


  //// Helpers ////

  addTodo(task: string) {

      let todo: Todo = {
        id: this.todoList.length + 1,
        task: task,
        order: this.todoList.length + 1,
        completed: 0
      }

      this.todoList.push(todo);
      this.reorderTodoList();
      return;
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
