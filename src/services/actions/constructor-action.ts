import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    DELETE_FROM_CONSTRUCTOR,
    CHANGE_INGREDIENTS_ORDER,
    RESET_CONSTRUCTOR
} from '../constants';

export interface IAddIngredientToConstructor {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly ingredientType: string,
    readonly name: string,
    readonly image: string;
    readonly price: number;
    readonly _id: string;
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_FROM_CONSTRUCTOR;
    readonly uniqueId: string;
}

export interface IChangeIngredientsOrder {
    readonly type: typeof CHANGE_INGREDIENTS_ORDER;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IResetContructor {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export type TConstructorActions = 
    IAddIngredientToConstructor |
    IDeleteIngredient | 
    IChangeIngredientsOrder |
    IResetContructor |
    any;


export const addIngredientToConstructor = (ingredientType: string, name: string, image: string, price: number, _id: string): IAddIngredientToConstructor  => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    ingredientType, name, image, price, _id
});

export const  deleteIngredient = (uniqueId: string): IDeleteIngredient => ({
    type: DELETE_FROM_CONSTRUCTOR,
    uniqueId
});

export const changeIngredientsOrder = ( dragIndex: number, hoverIndex: number): IChangeIngredientsOrder => ({
    type: CHANGE_INGREDIENTS_ORDER,
    dragIndex, 
    hoverIndex
})

export const resetConstructor = (): IResetContructor => ({
    type: RESET_CONSTRUCTOR,
});