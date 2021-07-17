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
        // case GET_INGREDIENT_DETAILS: {
        //     return { ...state, ingredientDetails: action.payload.details};
        // }
        // case CLOSE_INGREDIENT_DETAILS: {
        //     return { ...state, closeIngredientDetails: true, ingredientDetails: {}};
        // }
        // case INCREASE_INGREDIENT_COUNT: {
        //     return {
        //         ...state,
        //         ingredients: [...state.ingredients].map(ingredient =>
        //             ingredient.id === action.id ? ingredient.count = ingredient.count+1 : ingredient
        //         )
        //     };
        // }
        // case DECREASE_INGREDIENT_COUNT: {
        //     return {
        //         ...state,
        //         ingredients: [...state.ingredients].map(ingredient =>
        //             ingredient.id === action.id ? ingredient.count = ingredient.count-1 : ingredient
        //         )
        //     };
        // }
        default: {
            return { ...state };
        }
    }
}
