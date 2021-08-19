import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers/index';
import { wsMiddleware } from './middleware/ws-middleware';
import thunk from 'redux-thunk';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_PROFILE_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_GET_FEED_ORDERS,
    WS_CONNECTION_GET_PROFILE_ORDERS,
    WS_SEND_MESSAGE
} from './actions/websockets';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsProfileUrl = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsInitProfile: WS_PROFILE_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    getFeedOrders: WS_CONNECTION_GET_FEED_ORDERS,
    getProfileOrders: WS_CONNECTION_GET_PROFILE_ORDERS
};

const wsFeedOrdersMiddleware = wsMiddleware(wsUrl,wsActions);
const wsProfileOrdersMiddleware = wsMiddleware(wsProfileUrl,wsActions,true)

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk,
    wsFeedOrdersMiddleware,
    wsProfileOrdersMiddleware
));

const store = createStore(rootReducer, enhancer);

export default store;
