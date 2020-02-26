import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { Todo } from '../../interfaces';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];
  todoForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

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

    this.todoForm = this.formBuilder.group({
      todo: ['', Validators.required]
    });

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


  onSubmitClick() {
    this.isSubmitted = true;

    if (this.todoForm.valid) {
      let todo: Todo = {
        id: this.todoList.length + 1,
        task: this.todoForm.controls.todo.value,
        order: this.todoList.length + 1,
        completed: 0
      }

      this.todoList.push(todo);
      this.reorderTodoList();
      this.todoForm.reset();
      //this.todoForm.controls.todo.setValue(null);
      //this.todoForm.controls.todo.setErrors(null);
      this.isSubmitted = false;
      return;
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


  //// Helpers ////

  f() { return this.todoForm.controls; }


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
