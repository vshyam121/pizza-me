import * as actionTypes from "./orderActionTypes";

const initialState = {
    userInfo: null,
    orders: {}
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.STORE_USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case actionTypes.SUBMIT_ORDER:
            const orders = {...state.orders, [action.orderId]: action.order};
            return {
                ...state,
                orders: orders
            }
        default:
            return state;
    }
}

export default orderReducer;