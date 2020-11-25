import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderBoardRoutingModule } from './leader-board-routing.module';
import { LeaderBoardPageComponent } from './components/leader-board-page/leader-board-page.component';


@NgModule({
  declarations: [LeaderBoardPageComponent],
  imports: [
    CommonModule,
    LeaderBoardRoutingModule
  ]
})
export class LeaderBoardModule { }
