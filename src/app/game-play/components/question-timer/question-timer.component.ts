import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'question-timer',
  templateUrl: './question-timer.component.html',
  styleUrls: ['./question-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionTimerComponent implements OnInit {
  @Output() timeIsUp: EventEmitter<boolean> = new EventEmitter<boolean>(); // boolean page

  faHourglass = faHourglass;
  counter: number = 20;
  tick: number = 1000;
  counter$: Observable<number>;

  ngOnInit() {
    this.counter$ = timer(0, this.tick).pipe(
      map((x) => {
        this.counter--;
        if (x / 20 === 1) {
          this.timeIsUp.emit();
        }
        return this.counter;
      })
    )
  }
}
