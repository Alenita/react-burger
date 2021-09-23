import { combineReducers } from 'redux';
import { constructorReducer } from './constructor-reducer';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './websockets';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorStore: constructorReducer,
    order: orderReducer,
    userData: userReducer,
    wsStore: wsReducer
  });

