import { types } from './types';

export const setQuestions = (questions) => ({
  type: types.SET_QUESTIONS,
  questions
});
