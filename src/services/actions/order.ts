import { 
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_ERROR,
    GET_ORDER_CARD_DETAILS_REQUEST,
    GET_ORDER_CARD_DETAILS_SUCCESS,
    GET_ORDER_CARD_DETAILS_ERROR,  
} from '../constants';
import { AppDispatch, AppThunk } from '../store';
import { TIngredientId, TOrder } from '../types/data'
import {URL} from '../../utils/constants';
import { getCookie } from '../../utils/utils';

export interface IGetOrderNumberRequest {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST
}

export interface IGetOrderNumberSuccess {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly orderId: number
}

export interface IGetOrderNumberError {
    readonly type: typeof GET_ORDER_NUMBER_ERROR;
}

export interface IGetOrderCardDetailsRequest {
    readonly type: typeof GET_ORDER_CARD_DETAILS_REQUEST;
}

export interface IGetOrderCardDetailsSuccess {
    readonly type: typeof GET_ORDER_CARD_DETAILS_SUCCESS;
    readonly orderCardDetails:  TOrder
}

export interface IGetOrderCardDetailsError {
    readonly type: typeof GET_ORDER_CARD_DETAILS_ERROR;
}

export type TOrderActions = 
    | IGetOrderNumberRequest 
    | IGetOrderNumberSuccess 
    | IGetOrderNumberError 
    | IGetOrderCardDetailsRequest
    | IGetOrderCardDetailsSuccess
    | IGetOrderCardDetailsError
    | any;

export const getOrderNumberRequestAction = (): IGetOrderNumberRequest => ({
    type: GET_ORDER_NUMBER_REQUEST,
});

export const getOrderNumberSuccessAction = (orderId: number): IGetOrderNumberSuccess => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    orderId
})

export const getOrderNumberErrorAction = (): IGetOrderNumberError => ({
    type: GET_ORDER_NUMBER_ERROR,
})

export const getOrderCardDetailsRequest = (): IGetOrderCardDetailsRequest => ({
    type: GET_ORDER_CARD_DETAILS_REQUEST
})

export const getOrderCardDetailsSuccess = (orderCardDetails: TOrder): IGetOrderCardDetailsSuccess => ({
    type: GET_ORDER_CARD_DETAILS_SUCCESS,
    orderCardDetails
})

export const getOrderCardDetailsError = (): IGetOrderCardDetailsError => ({
    type: GET_ORDER_CARD_DETAILS_ERROR,
})


export const getOrderNumber: AppThunk = (orderedList: ReadonlyArray<TIngredientId>) => (dispatch: AppDispatch) => {
    dispatch(getOrderNumberRequestAction());
    fetch(`${URL}/orders`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
                ingredients: orderedList
        })
    })
        .then((res) => {
            if(!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json()
        })
        .then((res) => dispatch(getOrderNumberSuccessAction(res.order.number))
        )
        .catch(error => {
            console.log('Error message: ' + error)
            dispatch(getOrderNumberErrorAction)}
        )
        
};

export const getOrderCardDetails: AppThunk = (number: number) => (dispatch: AppDispatch) => {
    dispatch (getOrderCardDetailsRequest());
    fetch(`${URL}/orders/${number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((res) => {
        if(!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json()
    })
    .then((res) => dispatch(getOrderCardDetailsSuccess(res.orders[0])))
    .catch(error => {
        console.log('Error message: ' + error)
        dispatch(getOrderCardDetailsError())
    })
}
