import * as types from '../actions/websockets';
import { wsReducer } from './websockets';

describe('wsReducer', () => {
    it('Должен вернуть первоначальное состояние', () => {
        expect(wsReducer(undefined,{})).toEqual({
            wsConnected: false,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        })
    });

    it('Должен возвращать флаг при подключении webSockets', () => {
        expect(wsReducer({
            wsConnected: false,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        }, {
            type: types.WS_CONNECTION_SUCCESS
        }
        )).toEqual({
            wsConnected: true,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        })
    });

    it('Должен возвращать первоначальный стату, если ошибка произошла во время запроса', () => {
        expect(wsReducer({
            wsConnected: true,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        },{
            type: types.WS_CONNECTION_ERROR
        }
        )).toEqual({
            initialState: {
                wsConnected: false,
                feedOrders: {
                    orders: [],
                    total: null,
                    totalToday: null,
                },
                profileOrders: {
                    orders: [],
                    total: null,
                    totalToday: null,
                }
            }
        })
    });

    it('Должен закрывать соединение и очищать state', () => {
        expect(wsReducer({
            wsConnected: true,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        }, 
        {
            type: types.WS_CONNECTION_CLOSED
        }
        )).toEqual({
            wsConnected: false,
            feedOrders: {
                orders: [],
                total: null,
                totalToday: null,
            },
            profileOrders: {
                orders: [],
                total: null,
                totalToday: null,
            }
        })
    });

    it('Должен сохранять данные для ленты заказов', () => {
        expect(wsReducer({
            
        }))
    });
})