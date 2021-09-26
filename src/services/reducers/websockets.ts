import { TWebsocketsActions } from './../actions/websockets';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_MESSAGE
} from '../constants';
import { TOrder } from '../types/data';

export type TWebsocketsState = {
    wsConnected: boolean,
    feedOrders: TOrder[] | [],
    total: number | null,
    totalToday: number | null
}

export const initialState: TWebsocketsState = {
    wsConnected: false,
    feedOrders: [],
    total: null,
    totalToday: null,
};

export const wsReducer = ( state=initialState, action: TWebsocketsActions ): TWebsocketsState => {
    switch(action.type) {
        case  WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return initialState;
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            };
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                feedOrders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        default: {
            return state;
        }
    }
}