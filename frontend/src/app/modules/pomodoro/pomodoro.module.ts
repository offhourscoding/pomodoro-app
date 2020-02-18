import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [PomodoroComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgCircleProgressModule.forRoot()
  ]
})
export class PomodoroModule { }
