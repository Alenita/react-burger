import {URL} from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

// export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
// export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS'; 

// export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
// export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

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

// export const getIngredientDetails = (details) => dispatch => {
//     dispatch({
//         type: GET_INGREDIENT_DETAILS,
//         payload: {details}
//     })
// };
