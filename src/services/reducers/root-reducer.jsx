import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer.jsx";
import { popupReducer } from "./popup-reducer.jsx";
import { cartReducer } from "./cart-reducer.jsx";

export const rootReducer = combineReducers({
    mainData: dataReducer,
    popup: popupReducer,
    cart: cartReducer,
})