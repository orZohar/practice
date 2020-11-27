import { Action, createReducer, on } from '@ngrx/store';
import { GameQuestion } from 'src/app/shared/models/game-question.model';
import { setCorrectAnswers, setCurrentQuestion, setInitData, setLives, setQuestions } from '../actions/game.actions';

export interface State {
  questions: GameQuestion[];
  lives: number;
  correctAnswers:number;
  currentQuestion: number;
}

export const initialState: State = {
  questions: [],
  lives: 3, // init lives for every user starting the game
  correctAnswers: 0,
  currentQuestion: 1
};

const gameReducer = createReducer(
  initialState,
  on(setQuestions, (state: State, action: any) => {
    return {
      ...state,
      questions: action
    }
  }),
  on(setLives, (state: State, action: any) => {
    return {
      ...state,
      lives: action.lives
    }
  }),
  on(setCorrectAnswers, (state: State, action: any) => {
    return {
      ...state,
      correctAnswers: action.correctAnswers
    }
  }),
  on(setCurrentQuestion, (state: State, action: any) => {
    return {
      ...state,
      currentQuestion: action.currentQuestion
    }
  }),
  on(setInitData, (state: State, action: any) => {
    return {
      ...state,
      lives: initialState.lives,
      correctAnswers: initialState.correctAnswers,
      currentQuestion: initialState.currentQuestion,
    }
  }),



);

export function reducer(state: State | undefined, action: Action) {
  return gameReducer(state, action);
}