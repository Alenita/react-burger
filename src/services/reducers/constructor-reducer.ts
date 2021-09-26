import { nanoid } from 'nanoid';
import { TConstructorActions } from '../actions/constructor-action';
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_FROM_CONSTRUCTOR,
    CHANGE_INGREDIENTS_ORDER,
    RESET_CONSTRUCTOR
} from '../constants';

export type TConstructorIngredient = {
    readonly _id: string;
    ingredientType: string;
    readonly name: string;
    readonly price: number;
    readonly image: string;
    readonly uniqueId: string;
}

export type TConstructorIngredientsState = {
    constructorIngredients: TConstructorIngredient[],
    topBun: TConstructorIngredient | null,
    bottomBun: TConstructorIngredient | null
}

const initialConstructor: TConstructorIngredientsState = {
    constructorIngredients: [],
    topBun: null,
    bottomBun: null,

};

export const constructorReducer = (state=initialConstructor, action: TConstructorActions): TConstructorIngredientsState => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: 
        const {ingredientType, name, image, price, _id} = action;
            if (ingredientType === 'bun') {
                return {
                    ...state,
                    topBun: {ingredientType, name, image, price, _id, uniqueId: nanoid()},
                    bottomBun: { ingredientType, name, image, price, _id, uniqueId: nanoid()}
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
                constructorIngredients: [],
                topBun: null,
                bottomBun: null
            }
        }

        default: { 
            return state;
        }
    }
}