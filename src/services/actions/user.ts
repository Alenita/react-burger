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
import { AppDispatch, AppThunk } from '../store';

import { URL } from '../../utils/constants';
import { setCookie, getCookie, deleteCookie } from '../../utils/utils';
import { TUser, TAuthorization } from '../types/data';

export interface IUserDataRequestAction {
    readonly type: typeof GET_USER_DATA_REQUEST
}

export interface IRegisterSuccessAction {
    readonly type: typeof GET_USER_REGISTER_SUCCESS,
    user: TUser
}

export interface IUserDataErrorAction {
    readonly type: typeof GET_USER_DATA_ERROR,
}

export interface ILoginSuccessAction {
    readonly type: typeof GET_USER_LOGIN_SUCCESS,
    user: TUser
}

export interface IForgotPasswordSuccessAction {
    readonly type: typeof GET_USER_FORGOT_PASSWORD_SUCCESS,
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof GET_USER_RESET_PASSWORD_SUCCESS,
}

export interface IUserInforSuccessAction {
    readonly type: typeof GET_USER_INFO_SUCCESS,
    readonly user: TUser
}

export interface IRefreshTokenSuccessAction {
    readonly type: typeof GET_USER_REFRESH_TOKEN_SUCCESS,
    readonly payload: TAuthorization
}
export interface IUserInfoUpdateSuccessAction {
    readonly type: typeof GET_USER_INFO_UPDATE_SUCCESS,
    readonly user: TUser
}

export interface IUserLogoutSuccessAction {
    readonly type: typeof GET_USER_LOGOUT_SUCCESS
}

export type TUserActions = 
    IUserDataRequestAction |
    IUserDataErrorAction |
    IRegisterSuccessAction |
    ILoginSuccessAction |
    IForgotPasswordSuccessAction |
    IResetPasswordSuccessAction |
    IUserInforSuccessAction |
    IRefreshTokenSuccessAction |
    IUserInfoUpdateSuccessAction |
    IUserLogoutSuccessAction |
    any;

export const getUserRegister: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
        fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            email,
            password,
            name
        })
        })
        .then((res) => {
            if(!res.ok) {
                return Promise.reject(res.status);
            }   
            return res.json();
            })
        .then((res) => {
            dispatch({
                type: GET_USER_REGISTER_SUCCESS, 
                user: res.user,
            })
            return res;
        })
        .catch((error) => {
            console.log('Error reister message: ' + error)
            dispatch({
                type: GET_USER_DATA_ERROR,
            })
        })
};

export const getUserLogin: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
        });
        fetch(`${URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        .then((res) => {
            if (res.status === 401) {
                alert('E-mail или пароль введены неправильно. Попробуйте ещё раз.');
            }
            if(!res.ok) {
                return Promise.reject(res.status);
            }
            return res.json();
        })
        .then((res) => {
            dispatch({
                type: GET_USER_LOGIN_SUCCESS, 
                user: res.user,
            })
        if (res.refreshToken && res.accessToken) {
            setCookie('accessToken', res.accessToken.split('Bearer ')[1], null);;
            localStorage.setItem('refreshToken', res.refreshToken);
        }})
        .catch((error) => {
            console.log('Error login message: ' + error)
            dispatch({
                type: GET_USER_DATA_ERROR,
            })
        })
    };

    export const getUserForgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
        dispatch({
            type: GET_USER_DATA_REQUEST
        });
            fetch(`${URL}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        .then((res) => {
            if(!res.ok) {
                return Promise.reject(res.status);
            } 
            return res.json()
        })
        .then((res) =>{ 
            dispatch({
                type: GET_USER_FORGOT_PASSWORD_SUCCESS, 
            })
            return res.user;
        })
        .catch(error => {
            console.log('Error forgot password message: ' + error)
            dispatch({type: GET_USER_DATA_ERROR})}
        )
    };

export const getUserResetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
        fetch(`${URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password,token
        })
    })
    .then((res) => {
        if(!res.ok) {
            return Promise.reject(res);
        } 
        return res.json()
    })
    .then((res) => dispatch({
        type: GET_USER_RESET_PASSWORD_SUCCESS, 
        user: res.user,
        })
    )
    .catch(error => {
        console.log('Error user reset password message: ' + error)
        dispatch({type: GET_USER_DATA_ERROR})}
    )
};

export const getUserInfo: AppThunk = () => (dispatch: AppDispatch) => {
    if (!localStorage.getItem('refreshToken')) {
        return
    }
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
    fetch(`${URL}/auth/user`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken')
        },
    })
    .then(res => res.json())
    .then(res => {
        if (!res.success) {
            throw res;
        } 
        dispatch({
            type: GET_USER_INFO_SUCCESS, 
            user: res.user,
        });
    })
    .catch(res => {
        if (res.message === 'jwt expired') {
                dispatch(getUserRefreshToken())
        }
        dispatch({
            type: GET_USER_DATA_ERROR, 
        })
        console.log('Error get user info: '+ res.message)
    });
};

export const getUserRefreshToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    })
    fetch(`${URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(res.status);
        } 
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_REFRESH_TOKEN_SUCCESS,
        })
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1], null);
        dispatch(getUserInfo())
    })
    .catch(error => {
        dispatch({
            type: GET_USER_DATA_ERROR, 
        });
        console.log('Error refresh token message: ' + error)
    });
};

export const getUserInfoUpdate: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
    fetch(`${URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify({ email, password, name})
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_INFO_UPDATE_SUCCESS,
            user: res.user,
        })
    })
    .catch(error => {
        dispatch({
            type: GET_USER_DATA_ERROR
        })
        console.log('Error user update info message: ' + error)
    })
};

export const getUserLogout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_USER_DATA_REQUEST
    });
    fetch(`${URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    .then(res => {
        if(!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_LOGOUT_SUCCESS
        });
        localStorage.setItem('refreshToken', '');
        deleteCookie('accessToken');
    })
    .catch(error => {
        dispatch({
            type: GET_USER_DATA_ERROR
        });
        console.log('Error user logout: ' + error)
    })
} 