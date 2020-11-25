import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePlayRoutingModule } from './game-play-routing.module';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';
import { GameQuestionComponent } from './components/game-question/game-question.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {GameEffects} from './effects/games.effects';
import {reducer} from './reducers/game.reducers';
import { SharedModule } from '../shared/shared.module';
import { GameOverDialogComponent } from './components/game-over-dialog/game-over-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [GameDashboardComponent, GameQuestionComponent, GameOverDialogComponent],
  imports: [
    CommonModule,
    GamePlayRoutingModule,
    SharedModule,
    EffectsModule.forFeature([GameEffects]),
    StoreModule.forFeature('game', reducer )
  ],
  providers :[DialogService]
})
export class GamePlayModule { }
