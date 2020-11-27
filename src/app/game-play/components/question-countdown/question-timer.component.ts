import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'question-timer',
  templateUrl: './question-timer.component.html',
  styleUrls: ['./question-timer.component.scss']
})
export class QuestionTimerComponent implements OnInit {
  @Output() timeIsUp: EventEmitter<boolean> = new EventEmitter<boolean>(); // boolean page

  faHourglass = faHourglass;
  subscription: Subscription = new Subscription();
  counter: number = 20;
  tick: number = 1000;

  ngOnInit() {
    this.subscription = timer(2, this.tick).pipe(
      tap((x) => {
        if (x / 20 === 1) {
          this.timeIsUp.emit();
        }
      })
    )
      .subscribe(() => --this.counter);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
