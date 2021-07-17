export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';
export const CHANGE_INGREDIENTS_ORDER = 'CHANGE_INGREDIENTS_ORDER';

export const addIngredientToConstructor = (ingredientType, name, image, price, _id) => dispatch => {
    dispatch ({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        ingredientType, name, image, price, _id
    })
};

export const  deleteIngredient = (uniqueId) => dispatch => {
    dispatch ({
        type: DELETE_FROM_CONSTRUCTOR,
        uniqueId
    })
};

export const changeIngredientsOrder = (dragIngredient, dragIndex, hoverIndex) => dispatch => {
    dispatch({
        type: CHANGE_INGREDIENTS_ORDER,
        // uniqueId,
        // index
        dragIngredient,dragIndex, hoverIndex
    })
}