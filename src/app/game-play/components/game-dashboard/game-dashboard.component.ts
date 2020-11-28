import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, timer } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { GameQuestion } from 'src/app/shared/models/game-question.model';
import { setCorrectAnswers, setCurrentQuestion, setLives } from '../../actions/game.actions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { TrackByService } from '../../../core/services/trackby.service';
import { fadeInOut } from 'src/app/shared/animations';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss'],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameDashboardComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  currIndex: number = 0;
  correctAnswers: number = 0;
  livesLeft: number;
  answersMatrix: any = [];
  currentQuestion: number;
  ref: DynamicDialogRef;
  clickToggle: boolean = false;
  gameIsRunning: boolean = true;
  prepareNextQuestionMsg: string = "";

  nextQuestionTimer = timer(3000);
  destroy$ = new Subject();
  startQuestionCheckingProcess: boolean = false; // for disabling the user actions while waiting for next question
  questions$: Observable<GameQuestion[]>;

  constructor(private store$: Store<any>, public dialogService: DialogService, public trackbyService: TrackByService) { }

  ngOnInit(): void {
    this.store$.pipe(select('game', 'currentQuestion')
    ).subscribe(result => {
      this.currentQuestion = result;
    })

    this.store$.pipe(select('game', 'lives')).subscribe(result => {
      this.livesLeft = result;
    })

    this.questions$ = this.store$.pipe(
      select('game', 'questions'),
      tap(questionsArray => {
        // assign all the answers to matrix of answers and shuffle every array of answers in the matrix
        this.assignAnswersToMatrix(questionsArray);
      })
    )
  }

  updateAnswer(isCorrect, timeIsUp, skipQuestion) {

    // if user skipped a question pass him immediately to the next question
    if (!skipQuestion) {
      // disable user clicking untill passing to next question
      this.startQuestionCheckingProcess = true;

      // show answer message for 3 seconds
      this.runQuestionTimer();

      if (isCorrect) {
        this.correctAnswers++;
        this.prepareNextQuestionMsg = "GOOD JOB!!! Prepare for the next question..."
      } else {
        this.livesLeft--;
        this.store$.dispatch(setLives({ lives: this.livesLeft }));
        this.prepareNextQuestionMsg = timeIsUp ? "TIMES UP :( Prepare for the next question..." : "WRONG!!! Prepare for the next question..."
      }
    } else {
      this.livesLeft--;
      this.currentQuestion++;
      this.currIndex++;
      this.store$.dispatch(setLives({ lives: this.livesLeft }));
    }

    this.store$.dispatch(setCorrectAnswers({ correctAnswers: this.correctAnswers }));
    this.store$.dispatch(setCurrentQuestion({ currentQuestion: this.currentQuestion }));

    // if it's the end of the game go to leader board 
    if (this.currIndex === this.answersMatrix.length - 1 || this.livesLeft === 0) {
      this.finishTheGame();
    }
  }

  assignAnswersToMatrix(questionsArray) {
    var tempArray = [];
    for (let question of Object.values(questionsArray)) {
      tempArray = tempArray.concat(question['incorrect_answers']);
      tempArray.push(question['correct_answer']);
      tempArray = this.shuffleAnswers(tempArray);
      this.answersMatrix.push(tempArray);
      tempArray = [];
    }
  }

  runQuestionTimer() {
    this.nextQuestionTimer.pipe(takeUntil(this.destroy$)).subscribe(val => {
      this.prepareNextQuestionMsg = ""
      this.currentQuestion++
      this.currIndex++;
      this.startQuestionCheckingProcess = false;
    })
  }

  finishTheGame() {
    this.gameIsRunning = false;
    this.ref = this.dialogService.open(GameOverDialogComponent, {
      width: '100%',
      height: '100%',
      closable: false
    });
  }

  shuffleAnswers(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  addAnswerBorder(isCorrect) {
    if (this.startQuestionCheckingProcess && isCorrect) {
      return 'add-green-border';
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}