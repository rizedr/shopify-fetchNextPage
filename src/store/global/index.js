import * as types from './constants';

const initialState = {
  error: null,
  collectionsLoading: false,
  collections: [],
  selectedCollection: null,
  productsLoading: false,
  products: [],
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
    case types.SET_COLLECTION_PRODUCTS: {
      return {
        ...state,
        selectedCollection: action.collectionTitle,
        productsLoading: true,
        products: [],
      };
    }
    case types.SET_COLLECTION_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productsLoading: false,
        products: action.products,
      };
    }
    case types.SET_COLLECTION_PRODUCTS_ERROR: {
      return {
        ...state,
        productsLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
