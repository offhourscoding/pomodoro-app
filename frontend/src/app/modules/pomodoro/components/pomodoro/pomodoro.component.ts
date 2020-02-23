import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CircleProgressComponent } from 'ng-circle-progress';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  // Progress Settings
  percent = "100";
  radius="200";
  outerStrokeWidth="16";
  innerStrokeWidth="8";
  outerStrokeColor='#FFA726';
  //background='#00ACC1';
  titleColor='#fff';
  animation=false;
  animationDuration="300";
  title: string;
  interval;

  // Timers
  //focusTime = "1.00";
  //shortBreak = "5.00";
  //longBreak = "20.00";

  focusTime = "0.05";
  shortBreak = "0.10";
  longBreak = "0.20";
  
  status: string = 'stopped';
  completedPomodoros = 0;

  constructor() { }

  ngOnInit() {
    this.title = this.focusTime;
  }

  startPomodoro() {
    this.status = "focus";
    this.startCountDown(this.focusTime);

  }

  stopPomodoro() {
    this.status = 'stopped';
    this.nextPart();
  }
  
  startCountDown(timer: string) {

    let counter = eval(timer).toFixed(2);
    if (eval(timer) >= 1) {
      counter = counter * 60;
    } else {
      counter = counter * 100;
    }

    this.interval = setInterval(() => {
      counter--;

      if (counter < 0) {
        clearInterval(this.interval);
        this.nextPart();
      } else {
        let minute = (Math.floor((counter / 60))).toFixed(0).toString();
        let second = (counter % 60).toString();
        this.title = minute + '.' + second;
        // FIXME: Does not properly show progress when starting value is under 1 minute;
        this.percent = (counter / (eval(timer) * 60) * 100).toString();
      }
    }, 1000);
  }

  reset() {
    clearInterval(this.interval);
    this.percent = "100";
    this.title = this.focusTime;
  }

  nextPart() {
    this.percent = "100";
    if (this.status === 'focus') {
      console.log('focus');
      this.completedPomodoros++;
      console.log('C:', this.completedPomodoros);
      if (this.completedPomodoros !== 1 && this.completedPomodoros % 4 === 0) {
        console.log('here');
        this.status = 'long';
        this.startCountDown(this.longBreak);
      } else {
        this.status = 'short';
        this.startCountDown(this.shortBreak);
      }
    } else {
      console.log('break');
      this.status = 'stopped';
      this.reset();
    }
  }

  timerChange($event: any) {
    console.log($event);
    if ($event.timer === 'focus') {
      this.focusTime = $event.value;
    } else if ($event.timer === 'short') {
      this.shortBreak = $event.value;
    } else if ($event.timer === 'long') {
      this.longBreak = $event.value;
    }

    if (this.status === 'focus' || this.status === 'stopped') {
      this.title = this.focusTime;
    } else if (this.status === 'short') {
      this.title = this.shortBreak;
    } else if (this.status === 'long') {
      this.title = this.longBreak;
    }
  }

}
