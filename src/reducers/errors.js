import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  msg: null,
  status: null
};

export default function errors(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status
      };
    case CLEAR_ERRORS:
      return {
        msg: null,
        status: null
      };
    default:
      return state;
  }
}
