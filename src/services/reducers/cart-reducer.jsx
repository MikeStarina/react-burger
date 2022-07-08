import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER,
  MAKE_ORDER_FAILED,
  MAKE_ORDER_SUCCESS,
  DROP_CHANGE_ORDER,
} from "../actions/cart-actions.jsx";

const initialState = {
  items: [],
  dataSend: false,
  dataSendFailed: false,
  dataSendSuccess: false,
  order: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (
        action.data.type !== "bun" ||
        state.items.findIndex((item) => item.type === "bun") === -1
      ) {
        state.items.push(action.data);
      }

      if (
        action.data.type === "bun" &&
        state.items.findIndex((item) => item.type === "bun") !== -1
      ) {
        state.items = state.items.map((item) => {
          if (item.type === "bun") {
            item = action.data;
          }
          return item;
        });
      }

      return {
        ...state,
      };
    }
    case REMOVE_FROM_CART: {
      const deleteItem = state.items.findIndex(
        (item) => item._id === action.id
      );
      state.items.splice(deleteItem, 1);
      return {
        ...state,
      };
    }
    case MAKE_ORDER: {
      return {
        ...state,
        dataSend: true,
        dataSendFailed: false,
      };
    }
    case MAKE_ORDER_FAILED: {
      return {
        ...state,
        dataSend: false,
        dataSendFailed: true,
      };
    }
    case MAKE_ORDER_SUCCESS: {
      return {
        ...state,
        dataSend: false,
        dataSendFailed: false,
        dataSendSuccess: true,
        order: action.data,
      };
    }
    case DROP_CHANGE_ORDER: {
      return {
        ...state,
        items: action.items,
      };
    }
    default:
      return state;
  }
};
