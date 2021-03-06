import { normalize } from 'normalizr';
import { sectionsSchema } from '../../../webpack/schema';
import { expect } from '../test_helper';
import sections from '../../../webpack/reducers/sections_reducer';
import _ from 'lodash';
import {
  ADD_ENTITIES_FULFILLED,
  ADD_NESTED_ITEM,
  REMOVE_NESTED_ITEM
} from '../../../webpack/actions/types';

describe('sections reducer', () => {
  const twoQuestions = [{id:1,content:"M?",categoryId:1},{id:2,content:"F?",categoryId:1}];
  const twoSections = [
                    {id: 1, name: "Red Section",  userId: "testAuthor@gmail.com", questions:[]},
                    {id: 3, name: "Blue Section", userId: "testAuthor@gmail.com", questions: twoQuestions}
                   ];

  it('should fetch sections', () => {
    const payloadData = normalize(twoSections, sectionsSchema).entities;
    const action = {type: ADD_ENTITIES_FULFILLED, payload: payloadData};
    const startState = {}
    const nextState = sections(startState, action);
    expect(Object.keys(nextState).length).to.equal(2);
  });

  it('should add a question', () => {
    const section = {id: 1, name: "Red Section",  userId: "testAuthor@gmail.com", sectionNestedItems:[]}
    const nestedItem = {id: 1, content: "Is this a question?", category: ""};
    const action = {type: ADD_NESTED_ITEM, payload: {nestedItem, section, type: 'question'} };
    const startState = {};
    const nextState = sections(startState, action);
    expect(nextState["1"].sectionNestedItems[0].questionId).to.equal(nestedItem.id);
  });

  it('should not add a question twice', () => {
    const section = {id: 1, name: "Red Section",  userId: "testAuthor@gmail.com", sectionNestedItems:[]}
    const nestedItem = {id: 1, content: "Is this a question?", category: ""};
    const action = {type: ADD_NESTED_ITEM, payload: {nestedItem, section, type: 'question'} };
    const nextState  = sections({}, action);
    const finalState = sections(nextState, action);
    expect(finalState["1"].sectionNestedItems.length).to.equal(1);
  });

  it('should remove a question', () => {
    const question = {id: 1, content: "Is this a question?", category: ""};
    const section = {id: 1, name: "Red Section",  userId: "testAuthor@gmail.com", sectionNestedItems:[question]};
    const action = {type: REMOVE_NESTED_ITEM, payload: {section, index: 0} };
    const startState = {1: section};
    const nextState = sections(startState, action);
    expect(nextState["1"].sectionNestedItems.length).to.equal(0);
  });
});
