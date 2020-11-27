import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { setLives } from 'src/app/game-play/actions/game.actions';
import { GameQuestion } from '../../models/game-question.model';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  faHeart = faHeart;
  currQuestionNumber: number = 1;
  livesLeft: number;
  lives$: Observable<number> = this.store$.pipe(
    select('game', 'lives'),
    tap(x => { this.livesLeft = x })
  )

  correctAnswers$: Observable<number> = this.store$.pipe(
    select('game', 'correctAnswers')
  )
  
  questions$: Observable<GameQuestion[]> = this.store$.pipe(
    select('game', 'questions')
  )
  currentQuestion$: Observable<number> = this.store$.pipe(
    select('game', 'currentQuestion')
  )

  constructor(private httpClient: HttpClient, private store$: Store<any>) { }
  ngOnInit(): void {

    
  }
}