import * as types from '../constants';
import { wsReducer } from './websockets';

describe('wsReducer', () => {
    it('Должен вернуть первоначальное состояние', () => {
        expect(wsReducer(undefined,{})).toEqual({
            wsConnected: false,
            feedOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Должен возвращать флаг при подключении webSockets', () => {
        expect(wsReducer({
            wsConnected: false,
            feedOrders: [],
            total: null,
            totalToday: null,
        }, {
            type: types.WS_CONNECTION_SUCCESS
        }
        )).toEqual({
            wsConnected: true,
            feedOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Должен возвращать initialState, если ошибка произошла во время запроса', () => {
        expect(wsReducer({
            wsConnected: true,
            feedOrders: [],
            total: null,
            totalToday: null,
        },{
            type: types.WS_CONNECTION_ERROR
        }
        )).toEqual({
                wsConnected: false,
                feedOrders: [],
                total: null,
                totalToday: null,
        })
    });

    it('Должен закрывать соединение и очищать state', () => {
        expect(wsReducer({
            wsConnected: true,
            feedOrders: [],
            total: null,
            totalToday: null,
        }, 
        {
            type: types.WS_CONNECTION_CLOSED
        }
        )).toEqual({
            wsConnected: false,
            feedOrders: [],
            total: null,
            totalToday: null,
        })
    });

    it('Должен сохранять данные для ленты заказов', () => {
        expect(wsReducer({
            wsConnected: true,
            feedOrders: [],
            total: null,
            totalToday: null,
        }, 
        {
            type: types.WS_GET_ORDERS,
            payload: {
                orders: [
                    {
                        _id: "61257002f0871d001b100df2",
                        ingredients: [ "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
                        status: "done",
                        name: "Традиционный-галактический антарианский space бургер",
                        createdAt: "2021-08-24T22:17:38.664Z",
                        updatedAt: "2021-08-24T22:17:38.849Z", 
                        number: 2259
                    },
                    {
                        _id: "61256cfaf0871d001b100def",
                        ingredients: [ "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
                        status: "done",
                        name: "Флюоресцентный био-марсианский space бургер",
                        createdAt: "2021-08-24T22:04:42.597Z",
                        updatedAt: "2021-08-24T22:04:42.916Z", 
                        number: 2270
                    }
                ],
                total: 2400,
                totalToday: 30,
            }
        })).toEqual({
            wsConnected: true,
            feedOrders: [
                {
                    _id: "61257002f0871d001b100df2",
                    ingredients: [ "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
                    status: "done",
                    name: "Традиционный-галактический антарианский space бургер",
                    createdAt: "2021-08-24T22:17:38.664Z",
                    updatedAt: "2021-08-24T22:17:38.849Z", 
                    number: 2259
                },
                {
                    _id: "61256cfaf0871d001b100def",
                    ingredients: [ "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
                    status: "done",
                    name: "Флюоресцентный био-марсианский space бургер",
                    createdAt: "2021-08-24T22:04:42.597Z",
                    updatedAt: "2021-08-24T22:04:42.916Z", 
                    number: 2270
                }
            ],
            total: 2400,
            totalToday: 30,
        })
    });
    // it('Должен сохранять данные заказок пользователя', () => {
    //     expect(wsReducer({
    //         wsConnected: true,
    //         feedOrders: [],
    //         total: null,
    //         totalToday: null,
    //     }, 
    //     {
    //         type: types.WS_CONNECTION_GET_PROFILE_ORDERS,
    //         payload: {
    //             orders: [
    //                 {
    //                     _id: "61257002f0871d001b100df2",
    //                     ingredients: [ "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
    //                     status: "done",
    //                     name: "Традиционный-галактический антарианский space бургер",
    //                     createdAt: "2021-08-24T22:17:38.664Z",
    //                     updatedAt: "2021-08-24T22:17:38.849Z", 
    //                     number: 2259
    //                 },
    //                 {
    //                     _id: "61256cfaf0871d001b100def",
    //                     ingredients: [ "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
    //                     status: "done",
    //                     name: "Флюоресцентный био-марсианский space бургер",
    //                     createdAt: "2021-08-24T22:04:42.597Z",
    //                     updatedAt: "2021-08-24T22:04:42.916Z", 
    //                     number: 2270
    //                 }
    //             ],
    //             total: 2400,
    //             totalToday: 30,
    //         }
    //     })).toEqual({
    //         wsConnected: true,
    //         feedOrders: [],
    //         profileOrders: [
    //             {
    //                 _id: "61257002f0871d001b100df2",
    //                 ingredients: [ "60d3b41abdacab0026a733cd", "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
    //                 status: "done",
    //                 name: "Традиционный-галактический антарианский space бургер",
    //                 createdAt: "2021-08-24T22:17:38.664Z",
    //                 updatedAt: "2021-08-24T22:17:38.849Z", 
    //                 number: 2259
    //             },
    //             {
    //                 _id: "61256cfaf0871d001b100def",
    //                 ingredients: [ "60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733ce" ],
    //                 status: "done",
    //                 name: "Флюоресцентный био-марсианский space бургер",
    //                 createdAt: "2021-08-24T22:04:42.597Z",
    //                 updatedAt: "2021-08-24T22:04:42.916Z", 
    //                 number: 2270
    //             }
    //         ],
    //         total: 2400,
    //         totalToday: 30,
    //     })
    // });
})