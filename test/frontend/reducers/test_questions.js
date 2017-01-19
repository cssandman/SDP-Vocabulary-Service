import { expect } from '../test_helper';
import  questions  from '../../../webpack/reducers/questions_reducer';
import _ from 'lodash';
import {
  ADD_QUESTION,
  REMOVE_QUESTION,
  FETCH_QUESTIONS_FULFILLED
} from '../../../webpack/actions/types';

describe('questions reducer', () => {

  it('should add a question', () => {
    const question = {data:{id: 1, content: "Is this a question?", questionType: ""}}
    const action = {type: ADD_QUESTION, payload: question };
    const startState = {};
    const nextState = questions(startState, action);
    expect(nextState[1].id).to.equal(question.data.id);
  });

  it('should remove a question', () => {
    const action = {type: REMOVE_QUESTION, payload: 0 };
    const startState = {1: {id: 1, content: "Is this a question?", questionType: ""}};
    const nextState = questions(startState, action);
    expect(Object.keys(nextState).length).to.equal(0);
  });

  it('should fetch questions', () => {
    const questionData = {data: [{id: 1, content: "Is this a question?", questionType: ""},
                                 {id: 2, content: "Whats your name", questionType: ""},
                                 {id: 3, content: "What is a question?", questionType: ""}]};
    const action = {type: FETCH_QUESTIONS_FULFILLED, payload: questionData};
    const startState = {questions: {}}
    const nextState = questions(startState, action);
    expect(Object.keys(nextState).length).to.equal(3);
  });
});
