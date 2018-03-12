import Client from 'shopify-buy';
import * as types from './constants';

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
