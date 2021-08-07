import {
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_ERROR
} from '../actions/order';

export const initialState = {
    orderNumberRequest: false,
    orderId: null,
    orderRequestError: false,
    isShownOrderDetails: false,
}

export const orderReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true,
                orderId: null,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumberRequest: false,
                orderRequestError: false,
                orderId: action.orderId,
            }
        }
        case GET_ORDER_NUMBER_ERROR: {
            return {
                ...state,
                orderRequestError: true,
                orderNumberRequest: false
            }
        }
        default: {
            return state
        }
    }
}