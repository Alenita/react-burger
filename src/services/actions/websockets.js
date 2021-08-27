export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_END = 'WS_CONNECTION_END';
export const WS_PROFILE_CONNECTION_START = 'WS_PROFILE_CONNECTION_START';

export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_GET_FEED_ORDERS = 'WS_CONNECTION_GET_FEED_ORDERS';
export const WS_CONNECTION_GET_PROFILE_ORDERS = 'WS_CONNECTION_GET_PROFILE_ORDERS';

    export const getFeedOrders = (message) => {
        return {
            type: WS_CONNECTION_GET_FEED_ORDERS,
            payload: message
        }
    };

    export const getProfileOrders = (message) => {
        return {
            type: WS_CONNECTION_GET_PROFILE_ORDERS,
            payload: message
        }
    };

    export const wsConnectionSuccess = () => {
        return {
            type: WS_CONNECTION_SUCCESS
        };
    };

    export const wsConnectionError = () => {
        return {
        type: WS_CONNECTION_ERROR
        };
    };
    
    export const wsConnectionClosed = () => {
        return {
        type: WS_CONNECTION_CLOSED
        };
    };

    export const wsSendMessage = (message) => {
        return {
            type: WS_SEND_MESSAGE,
            payload: message
        }
    }

