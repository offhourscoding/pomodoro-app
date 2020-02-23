import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';
import { PomodoroSettingsComponent } from './components/pomodoro-settings/pomodoro-settings.component';

@NgModule({
  declarations: [PomodoroComponent, PomodoroSettingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgCircleProgressModule.forRoot(),
    FormsModule,
  ]
})
export class PomodoroModule { }
