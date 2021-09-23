import * as types from '../constants';
import { orderReducer } from './order';

describe('orderReducer', () =>  {
    it('Должен вернуть первоначальное состояние', () => {
        expect(orderReducer(undefined,{})).toEqual({
            orderRequest: false,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    });

    it('Должен возвращать флаг о начале загрузки', () => {
        expect(orderReducer({
            orderRequest: false,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        },
        {
            type: types.GET_ORDER_NUMBER_REQUEST
        })).toEqual({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    });

    it('Должен сохранять номер заказа после успешной загрузки', () => {
        expect(orderReducer({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        }, 
        {
            type: types.GET_ORDER_NUMBER_SUCCESS,
            orderId: 3214
        }
        )).toEqual({
            orderRequest: false,
            orderId: 3214,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    });

    it('Должен менять флаг об ошибке, если она возникла во время загрузки', () => {
        expect(orderReducer({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        },
        {
            type: types.GET_ORDER_NUMBER_ERROR
        }
        )).toEqual({
            orderRequest: false,
            orderId: null,
            orderRequestError: true,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    });
    it('Должен возвращать флаг о начале загрузки карточки с деталями заказа', () => {
        expect(orderReducer({
            orderRequest: false,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        },
        {
            type: types.GET_ORDER_CARD_DETAILS_REQUEST
        }
        )).toEqual({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    });

    it('Должен сохранять детали карточки заказа после успешного запроса', ()=> {
        expect(orderReducer({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        },{
            type: types.GET_ORDER_CARD_DETAILS_SUCCESS,
            orderCardDetails: {
                ingredients: [
                    "60d3463f7034a000269f45e9",
                    "60d3463f7034a000269f45e7"
                ],
                _id: "61251900a6e570001b4e0ad4",
                status: "done",
                name: "Альфа-сахаридный традиционный-галактический краторный минеральный бургер",
                createdAt:"2021-08-24T16:06:24.876Z",
                updatedAt:"2021-08-24T16:06:25.026Z",
                number:2250
            }
        })).toEqual({
            orderRequest: false,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: {
                ingredients: [
                    "60d3463f7034a000269f45e9",
                    "60d3463f7034a000269f45e7"
                ],
                _id: "61251900a6e570001b4e0ad4",
                status: "done",
                name: "Альфа-сахаридный традиционный-галактический краторный минеральный бургер",
                createdAt:"2021-08-24T16:06:24.876Z",
                updatedAt:"2021-08-24T16:06:25.026Z",
                number:2250
            }
        })
    });

    it('Должен менять флаг ошибки при неуспешном запросе', () => {
        expect(orderReducer({
            orderRequest: true,
            orderId: null,
            orderRequestError: false,
            isShownOrderDetails: false,
            orderCardDetails: []
        },{
            type: types.GET_ORDER_CARD_DETAILS_ERROR
        })).toEqual({
            orderRequest: false,
            orderId: null,
            orderRequestError: true,
            isShownOrderDetails: false,
            orderCardDetails: []
        })
    })
})