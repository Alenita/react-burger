import { URL } from '../../utils/constants';
import { setCookie, getCookie, deleteCookie } from '../../utils/utils';

export const GET_USER_REGISTER_REQUEST = 'GET_USER_REGISTER_REQUEST';
export const GET_USER_REGISTER_SUCCESS = 'GET_USER_REGISTER_SUCCESS';
export const GET_USER_REGISTER_ERROR = 'GET_USER_REGISTER_ERROR';

export const GET_USER_LOGIN_REQUEST = 'GET_USER_LOGIN_REQUEST';
export const GET_USER_LOGIN_SUCCESS = 'GET_USER_LOGIN_SUCCESS';
export const GET_USER_LOGIN_ERROR = 'GET_USER_LOGIN_ERROR';

export const GET_USER_FORGOT_PASSWORD_REQUEST = 'GET_USER_FORGOT_PASSWORD_REQUEST';
export const GET_USER_FORGOT_PASSWORD_SUCCESS = 'GET_USER_FORGOT_PASSWORD_SUCCESS';
export const GET_USER_FORGOT_PASSWORD_ERROR = 'GET_USER_FORGOT_PASSWORD_ERROR';

export const GET_USER_RESET_PASSWORD_REQUEST = 'GET_USER_RESET_PASSWORD_REQUEST';
export const GET_USER_RESET_PASSWORD_SUCCESS = 'GET_USER_RESET_PASSWORD_SUCCESS';
export const GET_USER_RESET_PASSWORD_ERROR = 'GET_USER_RESET_PASSWORD_ERROR';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR'; 

export const GET_USER_REFRESH_TOKEN_REQUEST = 'GET_USER_REFRESH_TOKEN_REQUEST';
export const GET_USER_REFRESH_TOKEN_SUCCESS = 'GET_USER_REFRESH_TOKEN_SUCCESS';
export const GET_USER_REFRESH_TOKEN_ERROR = 'GET_USER_REFRESH_TOKEN_ERROR'; 

export const GET_USER_INFO_UPDATE_REQUEST = 'GET_USER_INFO_UPDATE_REQUEST';
export const GET_USER_INFO_UPDATE_SUCCESS = 'GET_USER_INFO_UPDATE_SUCCESS';
export const GET_USER_INFO_UPDATE_ERROR = 'GET_USER_INFO_UPDATE_ERROR';

export const GET_USER_LOGOUT_REQUEST = 'GET_USER_LOGOUT_REQUEST';
export const GET_USER_LOGOUT_SUCCESS = 'GET_USER_LOGOUT_SUCCESS';
export const GET_USER_LOGOUT_ERROR = 'GET_USER_LOGOUT_ERROR'; 

export const getUserRegister = (email,password,name) => async dispatch => {
    dispatch({
        type: GET_USER_REGISTER_REQUEST
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
                throw Error(res.status);
            }   
            return res.json();
            })
        .then((res) => {
            dispatch({
                type: GET_USER_REGISTER_SUCCESS, 
                payload: res,
            })
            return res;
        })
        .catch((error) => {
            dispatch({
                type: GET_USER_REGISTER_ERROR,
            })
            return {success: false, errorMessage: error}
        })
};

export const getUserLogin = (email,password) => dispatch => {
    dispatch({
        type: GET_USER_LOGIN_REQUEST
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
                throw new Error(res.status);
            }
            return res.json();
        })
        .then((res) => {
            dispatch({
                type: GET_USER_LOGIN_SUCCESS, 
                payload: res,
            })
        if (res.refreshToken) {
            setCookie('accessToken', res.accessToken.split('Bearer ')[1]);;
            localStorage.setItem('refreshToken', res.refreshToken);
        }})
        .catch((error) => {
            console.log('Error login message: ' + error)
            dispatch({
                type: GET_USER_LOGIN_ERROR,
            })
        })
    };

    export const getUserForgotPassword = (email) => dispatch => {
        dispatch({
            type: GET_USER_FORGOT_PASSWORD_REQUEST
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
                throw new Error(res.status);
            } 
            return res.json()
        })
        .then((res) =>{ 
            dispatch({
                type: GET_USER_FORGOT_PASSWORD_SUCCESS, 
                payload: res,
            })
            return res;
        })
        .catch(error => {
            console.log('Error forgot password message: ' + error)
            dispatch({type: GET_USER_FORGOT_PASSWORD_ERROR})}
        )
    };

export const getUserResetPassword = (password,token) => dispatch => {
    dispatch({
        type: GET_USER_RESET_PASSWORD_REQUEST
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
            throw new Error(res.status);
        } 
        return res.json()
    })
    .then((res) => dispatch({
        type: GET_USER_RESET_PASSWORD_SUCCESS, 
        payload: res,
        })
    )
    .catch(error => {
        console.log('Error user reset password message: ' + error)
        dispatch({type: GET_USER_RESET_PASSWORD_ERROR})}
    )
};

export const getUserInfo = () => dispatch => {
    dispatch({
        type: GET_USER_INFO_REQUEST
    });
    fetch(`${URL}/auth/user`, {
        method: 'GET',
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
            payload: res,
        });
    })
    .catch(res => {
        if (res.message === 'jwt expired') {
                dispatch(getUserRefreshToken())
        }
        dispatch({
            type: GET_USER_INFO_ERROR, 
        })
        console.log('Error get user info: '+ res.message)
    });
};

export const getUserRefreshToken = (afterRefreshFunc) => dispatch => {
    dispatch({
        type: GET_USER_REFRESH_TOKEN_REQUEST
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
            console.log(res);
            throw new Error(res.status);
        } 
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_REFRESH_TOKEN_SUCCESS,
            payload: res,
        })
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        dispatch(afterRefreshFunc)
    })
    .catch(error => {
        dispatch({
            type: GET_USER_REFRESH_TOKEN_ERROR, 
        });
        console.log('Error refresh token message: ' + error)
    });
};

export const getUserInfoUpdate = (email, password, name) => dispatch => {
    dispatch({
        type: GET_USER_INFO_UPDATE_REQUEST
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
            throw new Error(res.status);
        }
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_INFO_UPDATE_SUCCESS,
            payload: res,
        })
    })
    .catch(error => {
        dispatch({
            type: GET_USER_INFO_UPDATE_ERROR
        })
        console.log('Error user update info message: ' + error)
    })
};

export const getUserLogout = () => dispatch => {
    dispatch({
        type: GET_USER_LOGOUT_REQUEST
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
            throw new Error(res.status);
        }
        return res.json();
    })
    .then(res => {
        dispatch({
            type: GET_USER_LOGOUT_SUCCESS,
            payload: res,
        });
        localStorage.setItem('refreshToken', '');
        deleteCookie('accessToken');
    })
    .catch(error => {
        dispatch({
            type: GET_USER_LOGOUT_ERROR
        });
        console.log('Error user logout: ' + error)
    })
} 