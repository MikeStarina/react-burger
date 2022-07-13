import {
  GET_DATA_REQUEST,
  GET_DATA_REQUEST_SUCCESS,
  GET_DATA_REQUEST_FAILED,
  INCREASE_COUNTER,
  DECREASE_COUNTER,
  CHANGE_ACTIVE_MENU,
} from "../actions/data-actions.jsx";

const initialState = {
  data: [],
  dataRequest: false,
  dataRequestFailed: false,
  dataRequestSuccess: true,
  activeMenu: "buns",
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        dataRequest: true,
        dataRequestFailed: false,
      };
    }
    case GET_DATA_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        bun: action.bun,
        dataRequest: false,
      };
    }
    case GET_DATA_REQUEST_FAILED: {
      return {
        ...state,
        dataRequest: false,
        dataRequestFailed: true,
      };
    }
    case INCREASE_COUNTER: {
      const newData = state.data.map((item) => {
        if (item._id === action.data && item.type !== 'bun') {
          item.counter = item.counter + 1;
        } else if (item._id === action.data && item.type === 'bun') {
          item.counter = item.counter + 2;
        }
        return item;
      });
      return {
        ...state,
        data: newData,
      };
    }
    case DECREASE_COUNTER: {
      const newArr = state.data.map((item) => {
        if (item._id === action.data && item.type !== 'bun') {
          item.counter = item.counter - 1;
        } else if (item._id === action.data && item.type === 'bun') {
          item.counter = item.counter - 2;
        }
        return item;
      });
      return {
        ...state,
        data: newArr,
      };
    }
    case CHANGE_ACTIVE_MENU: {
      
      return {
        ...state,
        activeMenu: action.menu,
      };
    }
    default: {
      return state;
    }
  }
};
