import { 
    applyMiddleware, 
    createStore, 
    compose, 
    Action,
    ActionCreator 
} from 'redux';
import { ThunkAction } from "redux-thunk";
import thunk from "redux-thunk";
import { actionsAll } from './actions';
import { rootReducer } from './reducers/index';
import { wsMiddleware } from './middleware/ws-middleware';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS,
    WS_SEND_MESSAGE
} from './constants';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export const wsActions = {
    wsStart: WS_CONNECTION_START,
    wsStartProfile: WS_CONNECTION_START_PROFILE,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    getFeedOrders: WS_GET_ORDERS,
};

const wsFeedOrdersMiddleware = wsMiddleware(wsUrl, wsActions);

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__? : typeof compose;
    }
}

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk, wsFeedOrdersMiddleware
));

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, actionsAll>
>;
