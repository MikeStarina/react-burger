export const GET_DATA_REQUEST = "GET_DATA_REQUEST";
export const GET_DATA_REQUEST_FAILED = "GET_DATA_REQUEST_FAILED";
export const GET_DATA_REQUEST_SUCCESS = "GET_DATA_REQUEST_SUCCESS";
export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";
export const CHANGE_ACTIVE_MENU = "CHANGE_ACTIVE_MENU";

export function getData() {
  return function (dispatch) {
    dispatch({ type: GET_DATA_REQUEST });

    fetch("https://norma.nomoreparties.space/api/ingredients", {
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({ type: GET_DATA_REQUEST_FAILED });
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        
        const data = res.data.map((item) => {
          item.counter = 0;
          return item;
        });

        dispatch({
          type: GET_DATA_REQUEST_SUCCESS,
          data: data,
        });
      })
      .catch((err) => {
        dispatch({ type: GET_DATA_REQUEST_FAILED });
        console.log(err);
      });
  };
}
