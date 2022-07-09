export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const MAKE_ORDER_REQUEST = "MAKE_ORDER_REQUEST";
export const MAKE_ORDER_REQUEST_FAILED = "MAKE_ORDER_REQUEST_FAILED";
export const MAKE_ORDER_REQUEST_SUCCESS = "MAKE_ORDER_REQUEST_SUCCESS";
export const DROP_CHANGE_ORDER = "DROP_CHANGE_ORDER";

export function makeOrder(data) {

  

  return function (dispatch) {

    dispatch({ type: MAKE_ORDER_REQUEST });

    

    const order = {
      ingredients: data.map((item) => {
        return item._id;
      }),
    };

    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({ type: MAKE_ORDER_REQUEST_FAILED });
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        dispatch({
          type: MAKE_ORDER_REQUEST_SUCCESS,
          data: res,
        });
      });
  };
}
