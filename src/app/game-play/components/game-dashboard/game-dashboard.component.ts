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
import { TrackByService } from '../../../core/services/trackby.service';
import { fadeInOut } from 'src/app/shared/animations';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss'],
  animations: [fadeInOut]
})

export class GameDashboardComponent implements OnInit {
  currIndex: number = 0;
  correctAnswers: number = 0;
  livesLeft: number;
  answersArray: any = [];
  currentQuestion: number;
  ref: DynamicDialogRef;
  clickToggle: boolean = false;
  gameIsRunning: boolean = true;

  questions$: Observable<GameQuestion[]> = this.store$.pipe(
    select('game', 'questions'),
    tap(questionsArray => {

      // assign all the answers to matrix of answers and shuffle every array of answers in the matrix
      if (questionsArray['0']) {
        this.assignAnswersToMatrix(questionsArray);
      }

      // check later-----------------------------------------------------------------
      this.answersArray.pop();
    })
  )

  constructor(private store$: Store<any>, public dialogService: DialogService, public trackbyService: TrackByService) { }

  ngOnInit(): void {
    this.store$.pipe(take(1), select('game', 'currentQuestion')
    ).subscribe(result => {
      this.currentQuestion = result;
    })
    this.store$.pipe(take(1), select('game', 'lives')).subscribe(result => {
      this.livesLeft = result;
    })
  }

  assignAnswersToMatrix(questionsArray) {
    var tempArray = [];
    for (let question of Object.values(questionsArray)) {
      tempArray = tempArray.concat(question['incorrect_answers']);
      tempArray.push(question['correct_answer']);
      tempArray = this.shuffleAnswers(tempArray);
      this.answersArray.push(tempArray);
      tempArray = [];
    }
  }

  updateAnswer(isCorrect) {
    this.currentQuestion++
    this.currIndex++;

    if (isCorrect) {
      this.correctAnswers++;
    } else {
      this.livesLeft--;
      this.store$.dispatch(setLives({ lives: this.livesLeft }));
    }

    this.store$.dispatch(setCorrectAnswers({ correctAnswers: this.correctAnswers }));
    this.store$.dispatch(setCurrentQuestion({ currentQuestion: this.currentQuestion }));

    // in the end of the game route to leader board
    if (this.currIndex === this.answersArray.length || this.livesLeft === 0) {
      this.gameIsRunning = false;
      this.ref = this.dialogService.open(GameOverDialogComponent, {
        width: '100%',
        height: '100%',
        closable: false
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
}