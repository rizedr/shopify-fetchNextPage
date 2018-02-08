import * as types from './constants';

const initialState = {
  loaded: false,
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case types.INIT: {
      return {
        ...state,
        loaded: false,
      };
    }
    case types.INIT_DONE: {
      return {
        ...state,
        loaded: true,
      };
    }
    default:
      return state;
  }
}
