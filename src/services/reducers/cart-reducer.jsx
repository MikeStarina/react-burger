import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  MAKE_ORDER_REQUEST,
  MAKE_ORDER_REQUEST_FAILED,
  MAKE_ORDER_REQUEST_SUCCESS,
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
      let newDataItems = state.items;
      if (
        action.data.type !== "bun"
      ) {
        newDataItems.push(action.data);
      }

      if (
        action.data.type === "bun" &&
        newDataItems.findIndex((item) => item.type === "bun") !== -1
      ) {
        newDataItems = newDataItems.map((item) => {
          if (item.type === "bun") {
            item = action.data;
          }
          return item;
      });      
      } else if (
        action.data.type === "bun" &&
        newDataItems.findIndex((item) => item.type === "bun") === -1
      ) {
        newDataItems.push(action.data);
      }
      console.log(newDataItems);
      return {
        ...state,
        items: newDataItems,
      }
      }
    case REMOVE_FROM_CART: {
      const deleteItem = state.items.findIndex(
        (item) => item._id === action.id
      );
      state.items.splice(deleteItem, 1);
      return {
        ...state,
        items: state.items
      };
    }
    case MAKE_ORDER_REQUEST: {
      return {
        ...state,
        dataSend: true,
        dataSendFailed: false,
        items: state.items,
      };
    }
    case MAKE_ORDER_REQUEST_FAILED: {
      return {
        ...state,
        dataSend: false,
        dataSendFailed: true,
      };
    }
    case MAKE_ORDER_REQUEST_SUCCESS: {
      return {
        ...state,
        dataSend: false,
        dataSendFailed: false,
        dataSendSuccess: true,
        order: action.data,
      };
    }
    case DROP_CHANGE_ORDER: {
      //console.log(action.items);
      return {
        ...state,
        items: action.items,
      };
    }
    default:
      return state;
  }
};
