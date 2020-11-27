import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { SlideInOutAnimation } from '../../../shared/animations';
import { GamePlayService } from '../../services/game-play.service';

@Component({
  selector: 'app-game-over-dialog',
  templateUrl: './game-over-dialog.component.html',
  styleUrls: ['./game-over-dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'translateY(50%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
      ]),
      // transition(':leave', [   // :leave is alias to '* => void'
      //   animate(500, style({opacity:0})) 
      // ])
    ])
  ]
})

export class GameOverDialogComponent implements OnInit {
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.ref.close();
    this.router.navigate(['/']);

  }
  playerName: NgModel;
  correctAnswers : number;


  constructor(private store$: Store<any>, private router : Router, private gamePlayService : GamePlayService, private ref: DynamicDialogRef,) { }
//shown;
   ngOnInit(): void {
    this.store$.pipe(
      take(1),
      select('game', 'correctAnswers')).subscribe(result => {
        this.correctAnswers = result;
      })
   }

  addToLeaderBoard(){
    // update server (local storage in our case)
    this.gamePlayService.updateLeaderBoard(this.playerName, this.correctAnswers);
    this.router.navigate(['leaders']);
    this.ref.close();
  }

}
