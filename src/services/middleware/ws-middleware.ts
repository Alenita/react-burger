import { getCookie } from "../../utils/utils";
import { RootState } from '../store';
import { Middleware } from 'redux';
import { wsActions } from "../store";

export type WsActions = typeof wsActions;

export const wsMiddleware = (wsUrl: string, wsActions: WsActions): Middleware<{}, RootState> => {
    const socketMiddleware: Middleware<{}, RootState>  = (store) => {
        let socket: WebSocket | null= null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { 
                wsStart, 
                wsSendMessage, 
                onOpen, 
                onClose, 
                onError, 
                getFeedOrders
            } = wsActions;
            const accessToken = getCookie('accessToken');

            if (type ===  wsStart) {
                socket = payload?.token ? new WebSocket(`${wsUrl}?token=${payload.token}`) : new WebSocket(`${wsUrl}/all`)
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
                    dispatch({
                            type: getFeedOrders,
                            payload: restParsedData
                    });
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
    return socketMiddleware;
}