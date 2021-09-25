import { 
    WS_CONNECTION_START,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR, 
    WS_GET_ORDERS,
} from '../constants';
import { TMessage } from '../types/data';

export interface IWsConnect {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsProfileConnect {
    readonly type: typeof WS_CONNECTION_START_PROFILE,
}

export interface IConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface  IConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IGetFeedOrders {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TMessage
}

export type TWebsocketsActions = 
    | IConnectionSuccess 
    | IConnectionError 
    | IConnectionClosed 
    | IGetFeedOrders
    | IWsConnect
    | IWsProfileConnect
    | any;

export const wsConnect = (): IWsConnect => {
    return {
        type: WS_CONNECTION_START
    }
}

export const wsProfileConnect = (): IWsProfileConnect => {
    return {
        type: WS_CONNECTION_START_PROFILE,
    }
}

export const getFeedOrders = (message: TMessage): IGetFeedOrders => {
    return {
        type: WS_GET_ORDERS,
        payload: message
    }
};

export const wsConnectionSuccess = (): IConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = (): IConnectionError => {
    return {
    type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IConnectionClosed => {
    return {
    type: WS_CONNECTION_CLOSED
    };
};







