import { TIngredientsActions } from './../actions/ingredients';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    SET_INGREDIENT_DETAILS,
} from '../constants';
import { TIngredient } from '../types/data';

export type TIngredientsState = {
    ingredients: TIngredient[],
    ingredientsRequest: boolean,
    ingredientsError: boolean,
    ingredientDetails: TIngredient | null
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsError: false,
    ingredientDetails: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
        
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsError: false,
                ingredientDetails: action.ingredient
            }
        }

        default: {
            return state;
        }
    }
}
