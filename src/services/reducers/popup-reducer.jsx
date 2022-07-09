import { ORDER_POPUP_ISOPENED, INGREDIENT_POPUP_ISOPENED, CLOSE_MODAL } from "../actions/popup-actions.jsx";






const initialState = {
    isOpened: false,
    popup: '',
    ingredient: '',

}


export const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_POPUP_ISOPENED: {
            return {
                ...state,
                isOpened: true,
                popup: 'order popup',
            }
        }
        case INGREDIENT_POPUP_ISOPENED: {
            return {
                ...state,
                isOpened: true,
                popup: 'ingredients popup',
                ingredient: action.id,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                popup: '',
                ingredient: '',
                isOpened: false,
            
            }
        }
        default: return state;
    }
}