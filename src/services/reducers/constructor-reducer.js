import { nanoid } from 'nanoid';
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_FROM_CONSTRUCTOR,
    CHANGE_INGREDIENTS_ORDER
} from '../actions/constructor-action';

const initialConstructor = {
    constructorIngredients: [],
    bun: null,
};

export const constructorReducer = (state=initialConstructor, action) => {
    const {ingredientType, name, image, price, _id} = action;
    console.log(state.constructorIngredients)
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: 
            if (action.ingredientType === 'bun') {
                return {
                    ...state,
                    bun: {ingredientType, name, image, price, _id, uniqueId: nanoid()}
                }
            } else {
                return {...state, constructorIngredients: [...state.constructorIngredients, {ingredientType, name, image, price, _id, uniqueId: nanoid()}]}
            }
        case DELETE_FROM_CONSTRUCTOR: {
            return { ...state, constructorIngredients: [...state.constructorIngredients].filter(ingredient => ingredient.uniqueId !== action.uniqueId) };
        }
        case CHANGE_INGREDIENTS_ORDER: {
            const prevItem = state.constructorIngredients.splice(action.hoverIndex, 1, action.dragIngredient)
            return { ...state, 
                constructorIngredients: {
                    ...state.constructorIngredients.splice(action.dragIndex, 1, prevItem[0]),
                },
            }
        }
            // const prevIndex = state.constructorIngredients.findIndex(item => item.uniqId === action.uniqId);
            // if ((Math.min(prevIndex, action.index) < 0) || (Math.max(prevIndex, action.index) >= state.constructorIngredients.length)) {
            //     return state;
            // }
            // const item = state.constructorIngredients.splice(prevIndex, 1);
            // const updatedOrder = [
            //     ...state.constructorIngredients.slice(0, action.index),
            //     item[0],
            //     ...state.constructorIngredients.slice(action.index, state.constructorIngredients.length)
            // ]
            // return ({
            //     ...state,
            //     constructorReducer: updatedOrder
            // })
        default: { 
            return state;
        }
    }
}