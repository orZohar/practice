import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/gameplay'},
  {
    path: 'leaders',
    loadChildren: () => import('./leader-board/leader-board.module').then(m => m.LeaderBoardModule),
  },
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
