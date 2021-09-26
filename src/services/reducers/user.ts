import {
    GET_USER_DATA_REQUEST,
    GET_USER_DATA_ERROR,

    GET_USER_REGISTER_SUCCESS,
    GET_USER_LOGIN_SUCCESS,
    GET_USER_FORGOT_PASSWORD_SUCCESS,
    GET_USER_RESET_PASSWORD_SUCCESS,
    GET_USER_INFO_SUCCESS,
    GET_USER_REFRESH_TOKEN_SUCCESS,
    GET_USER_INFO_UPDATE_SUCCESS,
    GET_USER_LOGOUT_SUCCESS
} from '../constants';
import { TUser } from '../types/data';
import { TUserActions } from '../actions/user';

export type TUserDataState = {
    user: TUser | null;
    userDataRequest: boolean;
    userDataError: boolean;
    isUserLoggedIn: boolean;
    getUserEmail: boolean;
    isResetPassword: boolean
}

const initialState: TUserDataState = {
    user: null,
    userDataRequest: false,
    userDataError: false,
    isUserLoggedIn: false,
    getUserEmail: false,
    isResetPassword: false
}

export const userReducer = ( state=initialState, action: TUserActions ): TUserDataState => {
    switch (action.type) {
        case GET_USER_DATA_REQUEST: {
            return { 
                ...state, 
                userDataRequest: true 
            };
        }

        case GET_USER_LOGIN_SUCCESS: {
            return {
                ...state, 
                userDataRequest: false, 
                userDataError: false,
                user: action.user,
                isUserLoggedIn: true
            };
        }

        case GET_USER_REGISTER_SUCCESS: {
            return { 
                ...state, 
                userDataRequest: false, 
                userDataError: false,
                user: action.user,
            }
        }

        case GET_USER_LOGOUT_SUCCESS: {
            return { 
                user: null,
                userDataRequest: false,
                userDataError: false,
                isUserLoggedIn: false,
                getUserEmail: false,
                isResetPassword: false
            }
        }

        case GET_USER_FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                getUserEmail: true,
            }
        }

        case GET_USER_RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                isResetPassword: true,
            }
        }

        case GET_USER_DATA_ERROR: {
            return {...state}
        }

        // case GET_USER_INFO_ERROR:
        // case GET_USER_LOGIN_ERROR:
        // case GET_USER_REGISTER_ERROR: 
        // case GET_USER_REFRESH_TOKEN_ERROR:
        // {
        //     return {
        //         ...state,
        //         userDataRequest: false,
        //         userDataError: true,
        //         user: null,
        //         isUserLoggedIn: false   
        // }}

        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                user: action.user,
                isUserLoggedIn: true,
            }
        }

        case GET_USER_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                userDataError: false,
                isUserLoggedIn: true,
            }
        } 

        case GET_USER_INFO_UPDATE_SUCCESS: {
            return {
                ...state,
                user: action.user
            }
        }

        default: {
            return state
        }
    }
}