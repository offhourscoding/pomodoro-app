import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';

import { PomodoroModule } from 'src/app/modules/pomodoro';
import { TodoListModule } from 'src/app/modules/todo-list';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    PomodoroModule,
    TodoListModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class CoreModule { }
