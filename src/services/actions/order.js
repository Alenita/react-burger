import {URL} from '../../utils/constants';
import { getCookie } from '../../utils/utils';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';

export const GET_ORDER_CARD_DETAILS_REQUEST= 'GET_ORDER_CARD_DETAILS_REQUEST';
export const GET_ORDER_CARD_DETAILS_SUCCESS = 'GET_ORDER_CARD_DETAILS_SUCCESS';
export const GET_ORDER_CARD_DETAILS_ERROR = 'GET_ORDER_CARD_DETAILS_ERROR'; 

export const getOrderNumber = (orderedList) => dispatch => {
    dispatch({
        type: GET_ORDER_NUMBER_REQUEST
    });
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
                dispatch({type: GET_ORDER_NUMBER_ERROR});
                throw Error('Could not fetch the data');
            }
            return res.json()
        })
        .then((res) => dispatch({
            type: GET_ORDER_NUMBER_SUCCESS, 
            orderId: res.order.number
            })
        )
        .catch(error => {
            console.log('Error message: ' + error)
            dispatch({type: GET_ORDER_NUMBER_ERROR})}
        )
        
};

        export const getOrderCardDetails = (number) => dispatch => {
            dispatch ({
                type: GET_ORDER_CARD_DETAILS_REQUEST
            });
            fetch(`${URL}/orders/${number}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                console.log(res)
                if(!res.ok) {
                    dispatch({type: GET_ORDER_CARD_DETAILS_ERROR});
                    throw Error('Could not fetch the data');
                }
                return res.json()
            })
            .then((res) => dispatch({
                type: GET_ORDER_CARD_DETAILS_SUCCESS, 
                orderCardDetails: res
                }),
            )
            .catch(error => {
                console.log('Error message: ' + error)
                dispatch({type: GET_ORDER_CARD_DETAILS_ERROR})
            })
        }
