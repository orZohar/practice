import { createAction, props } from '@ngrx/store';

export const setQuestions = createAction(
  '[Questions] All Questions Loaded',
  props<{questions: any[]}>()
);

export const setLives = createAction(
  '[Lives] Amout of lives left',
  props<{lives: number}>()
);

export const setCorrectAnswers = createAction(
  '[CorrectAnswers] Amout of correct answers',
  props<{correctAnswers: number}>()
);

export const setCurrentQuestion = createAction(
  '[CurrentQuestion] Question number',
  props<{currentQuestion: number}>()
);