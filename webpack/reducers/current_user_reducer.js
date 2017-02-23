import {
  FETCH_CURRENT_USER_FULFILLED,
  LOG_IN_FULFILLED,
  SIGN_UP_FULFILLED
} from '../actions/types';

export default function currentUser(state = {}, action) {
  switch (action.type) {
    case SIGN_UP_FULFILLED:
    case LOG_IN_FULFILLED:
    case FETCH_CURRENT_USER_FULFILLED:
      return action.payload.data;
    default:
      return state;
  }
}