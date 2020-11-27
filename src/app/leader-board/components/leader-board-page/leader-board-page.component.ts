import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TrackByService } from 'src/app/core/services/trackby.service';
import { setInitData, setQuestions } from 'src/app/game-play/actions/game.actions';
//import {initQuestions} from '../../';

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss']
})
export class LeaderBoardPageComponent implements OnInit {
  leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));
  
  constructor(public trackbyService: TrackByService, private store$: Store, private router: Router) { }

  ngOnInit(): void {

  }
  startNewGame() {
    this.store$.dispatch({ type: '[GameEffects] INIT' });
    this.store$.dispatch(setInitData());
    this.router.navigate(['gameplay']);
  }
}