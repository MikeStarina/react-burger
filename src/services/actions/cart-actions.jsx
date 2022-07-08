export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const MAKE_ORDER = "MAKE_ORDER";
export const MAKE_ORDER_FAILED = "MAKE_ORDER_FAILED";
export const MAKE_ORDER_SUCCESS = "MAKE_ORDER_SUCCESS";
export const DROP_CHANGE_ORDER = "DROP_CHANGE_ORDER";

export function makeOrder(data) {
  const order = {
    ingredients: data.map((item) => {
      return item._id;
    }),
  };

  return function (dispatch) {
    dispatch({ type: MAKE_ORDER });

    fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch({ type: MAKE_ORDER_FAILED });
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        dispatch({
          type: MAKE_ORDER_SUCCESS,
          data: res,
        });
      });
  };
}
