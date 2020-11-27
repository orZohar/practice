import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
// import {
//   AllCoursesLoaded,
// } from './course.actions';
import {GamePlayService} from '../services/game-play.service';
import {throwError,of, Observable} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, tap, withLatestFrom} from "rxjs/operators";
import {Action, select, Store} from '@ngrx/store';
import { setQuestions} from '../actions/game.actions';
import {OnInitEffects } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameEffects implements OnInitEffects {
  constructor(private actions$ :Actions, private gamePlayService: GamePlayService, private httpClient : HttpClient) {}

  ngrxOnInitEffects(): Action {
   return {type : '[GameEffects] INIT'}
  }

  @Effect()
  initQuestions$: Observable<Action> = this.actions$.pipe(
    ofType('[GameEffects] INIT'),
    mergeMap((action) => this.gamePlayService.getQuestions()),
    map((data) => setQuestions(data as any))
  )






  
  
}