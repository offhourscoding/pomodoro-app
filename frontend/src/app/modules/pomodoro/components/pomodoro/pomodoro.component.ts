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
  radius="100";
  outerStrokeWidth="16";
  innerStrokeWidth="8";
  outerStrokeColor='#c2185b';
  background='#424242';
  titleColor='#fff';
  animation=false;
  animationDuration="300";
  title="Test";

  // Timers
  focusTime = "0.10";
  //focusTime = "1.00";


  constructor() { }

  ngOnInit() {
    this.title = this.focusTime;

  }

  decrease() {
    this.percent = (eval(this.percent) - 1).toString();
  }

  startCountDown() {

    let counter = eval(this.focusTime).toFixed(2);
    if (eval(this.focusTime) >= 1) {
      console.log('foo');
      counter = counter * 60;
    } else {
      counter = counter * 100;
    }

    console.log('Start Counter:', counter);

    var interval = setInterval(() => {
      counter--;

      console.log(counter);

      if (counter < 0) {
        clearInterval(interval);
      } else {
        let minute = (Math.floor((counter / 60))).toFixed(0).toString();
        let second = (counter % 60).toString();
        this.title = minute + '.' + second;
        // FIXME: Does not properly show progress when starting value is under 1 minute;
        this.percent = ((counter / (eval(this.focusTime) * 60) * 100)).toString();
      }
    }, 1000);
  }
}
