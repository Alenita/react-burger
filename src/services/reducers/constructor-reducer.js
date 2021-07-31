import { nanoid } from 'nanoid';
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_FROM_CONSTRUCTOR,
    CHANGE_INGREDIENTS_ORDER,
    RESET_CONSTRUCTOR
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
            const dragItem = state.constructorIngredients.splice(action.dragIndex, 1);
            const newArr= [
                            ...state.constructorIngredients.slice(0, action.hoverIndex),
                            dragItem[0],
                            ...state.constructorIngredients.slice(action.hoverIndex, state.constructorIngredients.length)
                        ]
            return ({
                ...state,
                constructorIngredients: newArr
            })
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: initialConstructor.constructorIngredients,
                bun: initialConstructor.bun,
            }
        }
        default: { 
            return state;
        }
    }
}