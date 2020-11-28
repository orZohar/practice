import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TrackByService } from 'src/app/core/services/trackby.service';
import { setInitData } from 'src/app/game-play/actions/game.actions';

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderBoardPageComponent implements OnInit {
  leaderBoard = JSON.parse(localStorage.getItem("leaderBoard"));

  constructor(public trackbyService: TrackByService, private store$: Store, private router: Router) { }
  ngOnInit(): void {}
  startNewGame() {
    // load new questions before starting the next game
    this.store$.dispatch({ type: '[GameEffects] INIT' });
    this.store$.dispatch(setInitData());
    this.router.navigate(['gameplay']);
  }
}