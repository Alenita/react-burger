import {URL} from '../../utils/constants';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_ERROR = 'GET_ORDER_NUMBER_ERROR';

export const getOrderNumber = (orderedList) => dispatch => {
    dispatch({
        type: GET_ORDER_NUMBER_REQUEST
    });
    fetch(`${URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
