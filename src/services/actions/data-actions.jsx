




export const GET_DATA = 'GET_DATA';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';
export const CHANGE_ACTIVE_MENU = 'CHANGE_ACTIVE_MENU';

export function getData() {

    return function(dispatch) {


        dispatch({ type: GET_DATA })

        fetch("https://norma.nomoreparties.space/api/ingredients", {
            headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                if (res.ok) {
                return res.json();
                }
                dispatch({ type: GET_DATA_FAILED });
                return Promise.reject(`Ошибка ${res.status}`);
                
            })
            .then((res) => {
                //console.log(res);
                const data = res.data.map((item) => {
                    item.counter = 0;
                    return item;
                })
                
                dispatch({ 
                    type: GET_DATA_SUCCESS,
                    data: data,
                    
                 })
                
            })
            .catch((err) => {
                dispatch({ type: GET_DATA_FAILED });
                console.log(err);
            });
    }
}

