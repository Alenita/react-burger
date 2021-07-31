import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
} from '../actions/ingredients';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
    ingredientDetails: {},
    closeIngredientDetails: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, ingredientsError: false, ingredients: action.ingredients, ingredientsRequest: false };
        }
        case GET_INGREDIENTS_ERROR: {
            return { ...state, ingredientsError: true, ingredientsRequest: false };
        }      
        default: {
            return state;
        }
    }
}
