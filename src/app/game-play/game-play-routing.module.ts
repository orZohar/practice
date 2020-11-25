import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: "gameplay",
        component: GameDashboardComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePlayRoutingModule { }
