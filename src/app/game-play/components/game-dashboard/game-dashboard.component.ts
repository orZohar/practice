import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { GameQuestion } from 'src/app/shared/models/game-question.model';
import { setCorrectAnswers, setCurrentQuestion, setLives } from '../../actions/game.actions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(2000, style({ opacity: 1 }))
      ]),
      // transition(':leave', [   // :leave is alias to '* => void'
      //   animate(500, style({opacity:0})) 
      // ])
    ])
  ]
})
export class GameDashboardComponent implements OnInit {
  currIndex: number = 0;
  correctAnswers: number = 0;
  livesLeft: number;
  answersArray: any = [];
  currentQuestion: number;
  ref: DynamicDialogRef;


  questions$: Observable<GameQuestion[]> = this.store$.pipe(
    select('game', 'questions'),
    tap(questionsArray => {
      var tempArray = [];
      // assign all the answers to matrix of answers and shuffle every array of answers in the matrix
      if (questionsArray['0']) {
        for (let question of Object.values(questionsArray)) {
          tempArray = tempArray.concat(question['incorrect_answers']);
          tempArray.push(question['correct_answer']);
          tempArray = this.shuffleAnswers(tempArray);
          this.answersArray.push(tempArray);
          tempArray = [];
        }
      }

      // check later-----------------------------------------------------------------
      this.answersArray.pop();
    })
  )

  constructor(private store$: Store<any>, public dialogService: DialogService) { }
  
  ngOnInit(): void {
    this.store$.pipe(
      take(1),
      select('game', 'currentQuestion')
    ).subscribe(result => {
      this.currentQuestion = result;
    })
    this.store$.pipe(
      take(1),
      select('game', 'lives')).subscribe(result => {
        this.livesLeft = result;
      })
  }

  updateAnswer(isCorrect) {
    if (isCorrect) {
      this.correctAnswers++;
    } else {
      this.livesLeft--;
      this.store$.dispatch(setLives({ lives: this.livesLeft }));
    }

    this.currentQuestion++
    this.currIndex++;
    this.store$.dispatch(setCorrectAnswers({ correctAnswers: this.correctAnswers }));
    this.store$.dispatch(setCurrentQuestion({ currentQuestion: this.currentQuestion }));

    // in the end of the game route to leader board
    if (this.currIndex === this.answersArray.length) {
      this.ref = this.dialogService.open(GameOverDialogComponent, {
        width: '100%',
        height: '100%',
        closable : false
      });  
    }
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

  trackByQuestionsFunction(index, item) {
    if (!item) {
      return null;
    }
    return index;
  }
}