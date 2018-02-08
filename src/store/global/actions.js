import * as types from './constants';

export function init() {
  return (dispatch) => {
    dispatch({
      type: types.INIT,
    });

    window.setTimeout(() => {
      dispatch({
        type: types.INIT_DONE,
      });
    }, 1000);
  };
}
