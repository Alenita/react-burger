import { TConstructorActions } from './constructor-action';
import { TIngredientsActions } from './ingredients';
import { TOrderActions } from './order';
import { TUserActions } from './user';
import { TWebsocketsActions } from './websockets';

export type actionsAll = 
    | TConstructorActions 
    | TIngredientsActions
    | TOrderActions 
    | TUserActions
    | TWebsocketsActions;
