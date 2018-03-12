import Client from 'shopify-buy';
import * as types from './constants';
import {
  getProducts,
} from './selectors';

const client = Client.buildClient({
  domain: 'andraandreescu-dev.myshopify.com',
  storefrontAccessToken: 'f657aada686c900d2ecab61ca11c6390'
});

export function setCollections() {
  return (dispatch) => {
    dispatch({
      type: types.SET_COLLECTIONS,
    });

    return client.collection.fetchAll(100)
      .then(collections => dispatch({
        collections,
        type: types.SET_COLLECTIONS_SUCCESS,
      }))
      .catch((error) => {
        console.error(new Error('Fetching collections'));
        console.error(error);
        return dispatch({
          error: 'Error Fetching Collections',
          type: types.SET_COLLECTIONS_ERROR,
        })
      });
  };
}

export function setCollectionProduct(collectionId, collectionTitle) {
  return (dispatch) => {
    dispatch({
      collectionTitle,
      type: types.SET_COLLECTION_PRODUCTS,
    });

    return client.collection.fetchWithProducts(collectionId)
      .then(({ products }) => dispatch({
        products,
        type: types.SET_COLLECTION_PRODUCTS_SUCCESS,
      }))
      .catch((error) => {
        console.error(new Error('Fetching Products'));
        console.error(error);
        return dispatch({
          error: 'Error Fetching Products',
          type: types.SET_COLLECTIONS_ERROR,
        })
      });
  };
}

export function setProductsNextPage() {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_PRODUCTS_NEXT_PAGE,
    });
    const state = getState();
    const products = getProducts(state);

    return client.fetchNextPage(products)
      .then((nextProducts) => {
        return dispatch({
          nextProducts,
          type: types.SET_PRODUCTS_NEXT_PAGE_SUCCESS,
        });
      });
  };
}
