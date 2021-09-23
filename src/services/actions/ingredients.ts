import { 
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    SET_INGREDIENT_DETAILS
} from '../constants';
import {URL} from '../../utils/constants';
import { AppDispatch, AppThunk } from '../store';
import { TIngredient } from '../types/data';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>
}

export interface IGetIngredientsErrorAction {
    readonly type: typeof GET_INGREDIENTS_ERROR
}

export interface ISetIngredientDetailsAction {
    readonly type: typeof SET_INGREDIENT_DETAILS;
    readonly ingredient: TIngredient;
}

export type TIngredientsActions = |
    IGetIngredientsRequestAction |
    IGetIngredientsSuccessAction |
    IGetIngredientsErrorAction |
    ISetIngredientDetailsAction|
    any;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsSuccess = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsError = (): IGetIngredientsErrorAction => ({
    type: GET_INGREDIENTS_ERROR,
})

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    fetch(`${URL}/ingredients`)
        .then((res) => {
            if(!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json()
        })
        .then((res) => dispatch(getIngredientsSuccess(res.data)))
        .catch(err => dispatch(getIngredientsError()));
};

export const setIngredientDetails = (ingredient: TIngredient): ISetIngredientDetailsAction => ({
        type: SET_INGREDIENT_DETAILS,
        ingredient
})

