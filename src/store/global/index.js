import * as types from './constants';

const initialState = {
  error: null,
  collectionsLoading: false,
  collections: [],
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case types.SET_COLLECTIONS: {
      return {
        ...state,
        collectionsLoading: true,
      };
    }
    case types.SET_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        collectionsLoading: false,
        collections: action.collections,
      };
    }
    case types.SET_COLLECTIONS_ERROR: {
      return {
        ...state,
        collectionsLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
