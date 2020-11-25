import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GameQuestion } from '../../shared/models/game-question.model';
import { map } from "rxjs/operators";
import { NoopAnimationPlayer } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {


  url = "https://opentdb.com/api.php?amount=10&type=multiple";

  constructor(private http: HttpClient) {

  }

  getQuestions(): Observable<GameQuestion[]> {
    return this.http.get(this.url)
      .pipe(
        map(res => res['results'])
      );
  }

  updateLeaderBoard(name, score) {
    var leadersList = null;
    leadersList = JSON.parse(localStorage.getItem("leaderBoard"));

    if (leadersList && leadersList.length > 0) {
    } else {
      leadersList = [];
    }
    leadersList.push({ name: name, score: score });
    leadersList.sort((a, b) => (a.score > b.score) ? -1 : 1);

    // remove worst new player
    if(leadersList.length > 10){
      leadersList.splice(-1, 1);
    }
    
    localStorage.setItem("leaderBoard", JSON.stringify(leadersList));
  }

}
