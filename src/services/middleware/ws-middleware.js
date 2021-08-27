import { getCookie } from "../../utils/utils";
export const wsMiddleware = (wsUrl, wsActions, addToken=false) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { 
                wsInit, 
                wsInitProfile, 
                wsSendMessage, 
                onOpen, 
                onClose, 
                onError, 
                getFeedOrders, 
                getProfileOrders,
            } = wsActions;
            const accessToken = getCookie('accessToken');

            if (type ===  wsInitProfile && accessToken && addToken) {
                socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
            }
            if (type ===wsInit && !addToken) {
                socket = new WebSocket(`${wsUrl}`);
            }
            if(socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                }
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                }
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    if (addToken) {
                        dispatch({ 
                            type: getProfileOrders, 
                            payload: restParsedData 
                        });
                    }
                    if (!addToken) {
                        dispatch({
                            type: getFeedOrders,
                            payload: restParsedData
                        });
                    }
                }
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
                if (type === wsSendMessage && accessToken) {
                    const message = { payload, token: accessToken };
                    socket.send(JSON.stringify(message))
                }
            }
            next(action);
        }
    }
}