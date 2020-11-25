import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderBoardPageComponent } from './components/leader-board-page/leader-board-page.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderBoardPageComponent,  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderBoardRoutingModule { }
