import * as types from '../actions/user';
import { userReducer } from './user';

describe('userreduser', () => {
    it('Должен возвращать начальное состояние', () => {
        expect(userReducer(undefined,{})).toEqual({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        })
    });
    it('Должен логинить пользователя при получении данных', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        },{
            type: types.GET_USER_LOGIN_SUCCESS,
            payload: {
                email: 'user@mail.com',
                name: 'user'
            }
        })).toEqual({
            user: {
                email: 'user@mail.com',
                name: 'user'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен регистрировать пользователя при получении данных', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        }, {
            type: types.GET_USER_REGISTER_SUCCESS,
            payload: {
                email: 'newuser@mail.com',
                name: 'New User'
            }
        })).toEqual({
            user: {
                email: 'newuser@mail.com',
                name: 'New User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен разлогинивать пользователя, обнуляя данные', () => {
        expect(userReducer({
            user: {
                email: 'user@mail.com',
                name: 'user'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        },{
            type: types.GET_USER_LOGOUT_SUCCESS,
        })).toEqual({
            initialState: {
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        }})
    });
    it('Должен менять флаг, что пользователь забыл пароль', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        },{
            type: types.GET_USER_FORGOT_PASSWORD_SUCCESS
        })).toEqual({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: true,
            isResetPassword: false
        })
    });
    it('Должен менять флаг, что юзер обновил пароль', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: true,
            isResetPassword: false
        }, {
            type: types.GET_USER_RESET_PASSWORD_SUCCESS
        })).toEqual({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: true,
            isResetPassword: true
        })
    });
    it('Должен вернуть первоначальные данные, если при обновлении информации о пользователе произошла ошибка', ()=> {
        expect(userReducer({
            user: {
                email: 'newuser@mail.com',
                name: 'New User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        },
        {
            type: types.GET_USER_INFO_UPDATE_ERROR
        })).toEqual({
            user: {
                email: 'newuser@mail.com',
                name: 'New User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен возвращать первоначальное состояние, если при запросе данных о пользователе произошла ошибка', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        }, {
            type: types.GET_USER_INFO_ERROR
        }
        )).toEqual({
            user: null,
            userDataRequest: false,
            userDataError: true,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен возвращать данные пользователя после успешного запроса', () => {
        expect(userReducer({
            user: null,
            userDataRequest: true,
            userDataError: false,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        },{
            type: types.GET_USER_INFO_SUCCESS,
            payload: {
                email: 'user@mail.com',
                name: 'User'
            }
        }
        )).toEqual({
            user: {
                email: 'user@mail.com',
                name: 'User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен возвращать данные о пользоваетеле при успешном обновлении токена', () => {
        expect(userReducer({
            user: null,
            userDataRequest: false,
            userDataError: true,
            isUserLoggedIn: false,
            getUserEmail: false,
            isResetPassword: false
        }, 
        {
            type: types.GET_USER_REFRESH_TOKEN_SUCCESS,
            payload: {
                email: 'user@mail.com',
                name: 'User'
            }
        } 
        )).toEqual({
            user: {
                email: 'user@mail.com',
                name: 'User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        })
    });

    it('Должен обновлять данные пользователя', () => {
        expect(userReducer({
            user: {
                email: 'user@mail.com',
                name: 'User'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        },{
            type: types.GET_USER_INFO_UPDATE_SUCCESS,
            payload: {
                email: 'betteruser@mail.com',
                name: 'BetterUser'
            }
        })).toEqual({
            user: {
                email: 'betteruser@mail.com',
                name: 'BetterUser'
            },
            userDataRequest: false,
            userDataError: false,
            isUserLoggedIn: true,
            getUserEmail: false,
            isResetPassword: false
        })
    })
})