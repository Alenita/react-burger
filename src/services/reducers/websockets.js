import { sortByDate } from '../../utils/utils';

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_GET_FEED_ORDERS,
    WS_CONNECTION_GET_PROFILE_ORDERS
} from '../actions/websockets';

export const initialState = {
    wsConnected: false,
    feedOrders: [],
    profileOrders: [],
    total: null,
    totalToday: null,
};

export const wsReducer = ( state=initialState, action ) => {
    switch(action.type) {
        case  WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                initialState
            };
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            };
        }
        case WS_CONNECTION_GET_FEED_ORDERS: {
            return {
                ...state,
                feedOrders: action.payload.orders?.sort(sortByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        case WS_CONNECTION_GET_PROFILE_ORDERS: {
            return {
                ...state,
                profileOrders: action.payload.orders?.sort(sortByDate),
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        default: {
            return state;
        }
    }
}