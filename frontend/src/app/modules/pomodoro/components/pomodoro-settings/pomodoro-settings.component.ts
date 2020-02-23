import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pomodoro-settings',
  templateUrl: './pomodoro-settings.component.html',
  styleUrls: ['./pomodoro-settings.component.css']
})
export class PomodoroSettingsComponent implements OnInit {

  @Input() focusTime: string;
  @Input() shortBreak: string;
  @Input() longBreak: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>(); 


  constructor() { }

  ngOnInit() {
  }

  focusChangeEvent() {
    console.log(this.focusTime);
    this.valueChange.emit({ timer: 'focus', value: this.focusTime });
  }

  shortBreakChangeEvent() {
    this.valueChange.emit({ timer: 'short', value: this.shortBreak });
  }

  longBreakChangeEvent() {
    this.valueChange.emit({ timer: 'long', value: this.longBreak });
  }

}
