import { TOrder } from './../types/data';
import { TOrderActions } from '../actions/order';
import {
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_ERROR,
    GET_ORDER_CARD_DETAILS_REQUEST,
    GET_ORDER_CARD_DETAILS_SUCCESS,
    GET_ORDER_CARD_DETAILS_ERROR
} from '../constants';

export type TOrderInitialState = {
    orderRequest: boolean,
    orderId: null | string,
    orderRequestError: boolean,
    isShownOrderDetails: boolean,
    orderCardDetails: TOrder | []
}

export const initialState: TOrderInitialState = {
    orderRequest: false,
    orderId: null,
    orderRequestError: false,
    isShownOrderDetails: false,
    orderCardDetails: []
}

export const orderReducer = ( state=initialState, action: TOrderActions ) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderId: null,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderRequestError: false,
                orderId: action.orderId,
            }
        }
        case GET_ORDER_NUMBER_ERROR: {
            return {
                ...state,
                orderRequestError: true,
                orderRequest: false
            }
        }

        case GET_ORDER_CARD_DETAILS_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case GET_ORDER_CARD_DETAILS_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderCardDetails: action.orderCardDetails
            }
        }
        case GET_ORDER_CARD_DETAILS_ERROR: {
            return {
                ...state,
                orderRequest: false,
                orderCardDetails: [],
                orderRequestError: true
            }
        }
        default: {
            return state
        }
    };
}