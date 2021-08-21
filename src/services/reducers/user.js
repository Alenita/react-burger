import {    
        GET_USER_REGISTER_REQUEST,
        GET_USER_REGISTER_SUCCESS,
        GET_USER_REGISTER_ERROR,

        GET_USER_LOGIN_REQUEST,
        GET_USER_LOGIN_SUCCESS,
        GET_USER_LOGIN_ERROR,

        GET_USER_RESET_PASSWORD_REQUEST,
        GET_USER_RESET_PASSWORD_SUCCESS,
        // GET_USER_RESET_PASSWORD_ERROR,

        GET_USER_FORGOT_PASSWORD_REQUEST,
        GET_USER_FORGOT_PASSWORD_SUCCESS,

        GET_USER_INFO_REQUEST, 
        GET_USER_INFO_SUCCESS,
        GET_USER_INFO_ERROR,

        GET_USER_REFRESH_TOKEN_REQUEST,
        GET_USER_REFRESH_TOKEN_SUCCESS,
        GET_USER_REFRESH_TOKEN_ERROR,

        GET_USER_INFO_UPDATE_REQUEST,
        GET_USER_INFO_UPDATE_SUCCESS,
        GET_USER_INFO_UPDATE_ERROR,

        GET_USER_LOGOUT_SUCCESS
    } from '../actions/user.js';

const initialState = {
    user: null,
    userDataRequest: false,
    userDataError: false,
    isUserLoggedIn: false,
    getUserEmail: false,
    isResetPassword: false
}

export const userReducer = ( state=initialState, action ) => {
    switch (action.type) {
        case GET_USER_LOGIN_REQUEST:
        case GET_USER_REGISTER_REQUEST:
        case GET_USER_FORGOT_PASSWORD_REQUEST:
        case GET_USER_RESET_PASSWORD_REQUEST:
        case GET_USER_INFO_UPDATE_REQUEST:
        case GET_USER_INFO_REQUEST:
        case GET_USER_REFRESH_TOKEN_REQUEST: {
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
                user: action.payload.user,
                isUserLoggedIn: true
            };
        }

        case GET_USER_REGISTER_SUCCESS: {
            return { 
                ...state, 
                userDataRequest: false, 
                userDataError: false,
                user: action.payload.user,
            }
        }

        case GET_USER_LOGOUT_SUCCESS: {
            return { 
                initialState
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

        case GET_USER_INFO_UPDATE_ERROR: {
            return {...state}
        }

        case GET_USER_INFO_ERROR:
        case GET_USER_LOGIN_ERROR:
        case GET_USER_REGISTER_ERROR: 
        case GET_USER_REFRESH_TOKEN_ERROR:
        {
            return {
                ...state,
                userDataRequest: false,
                userDataError: true,
                user: null,
                isUserLoggedIn: false   
        }}

        case GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                user: action.payload.user,
                isUserLoggedIn: true,
            }
        }

        case GET_USER_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                user: action.payload.user
            }
        } 

        case GET_USER_INFO_UPDATE_SUCCESS: {
            return {
                ...state,
                user: action.payload.user
            }
        }

        default: {
            return state
        }
    }
}