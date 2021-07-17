import { combineReducers } from 'redux';
import { constructorReducer } from './constructor-reducer';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorStore: constructorReducer,
    order: orderReducer,
  });

