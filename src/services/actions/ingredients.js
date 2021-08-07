import {URL} from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';

export const getIngredients = () => dispatch => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${URL}/ingredients`)
        .then((res) => {
            if(!res.ok) {
                throw Error('Could not fetch the data')
            }
            return res.json()
        })
        .then((res) => dispatch({
            type: GET_INGREDIENTS_SUCCESS, 
            ingredients:  res.data
            })
        )
        .catch(err => dispatch({
            type: GET_INGREDIENTS_ERROR,
            error: err
        }))
};

export const setIngredientDetails = (ingredient) => dispatch => {
    dispatch({
        type: SET_INGREDIENT_DETAILS,
        ingredient
    })
};

