import React, { useState } from 'react';
import styles from './registration.module.css';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { getUserLogin } from '../services/actions/user';

export const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { state } = useLocation()

    const { accessToken, refreshToken, isUserLoggedIn } = useSelector(state => state.userData);
    const [value, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        const {email, password} = value;
        e.preventDefault();
        dispatch(getUserLogin(email, password));
        if (accessToken && refreshToken) {
            history.replace('/')
        }
    };

    if (isUserLoggedIn) {
        return <Redirect to={state?.from || '/'} />
    }

    return(
        <>
            <div className={styles.wrapper}>
                <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
                <form   onSubmit={submitHandler}
                        className={styles.form}>
                    <Input 
                        type='text'
                        placeholder='E-mail'
                        onChange={onChange}
                        value={value.email}
                        name='email'
                        error={false}
                        //onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <div className={`${styles.container} mt-6`}>
                        <PasswordInput 
                            onChange={onChange} 
                            type='text'
                            placeholder='Пароль'
                            value={value.password}
                            name='password'
                            error={false}
                            // ref={inputRef}
                            //onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className="mt-6 mb-20">
                        <Button type="primary" size="medium">
                            Войти
                        </Button>
                    </div>
                </form>
                <div className={`${styles.additional} mb-20`}>
                    <div className={styles.line}>
                        <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь?&nbsp;</p>
                        <Link className={`${styles.link} text text_type_main-default`}
                                to='/register'>Зарегистрироваться
                        </Link>
                    </div>
                    <div className={styles.line}>
                        <p className='mt-4 text text_type_main-default text_color_inactive'>Забыли пароль?&nbsp;</p>
                        <Link className={`${styles.link} text text_type_main-default`} 
                                to='/forgot-password'> Восстановить пароль
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}