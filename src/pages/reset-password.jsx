import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './registration.module.css';
import { getUserResetPassword } from '../services/actions/user';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isUserLoggedIn, getUserEmail, isResetPassword } = useSelector(state => state.userData)

    const [value, setValue] = useState({ password: '', token: ''});

    const onChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const passwordResetHandler = (e) => {
        e.preventDefault();
        dispatch(getUserResetPassword(value.password, value.token))
    }

    useEffect(() => { 
        if(isResetPassword) {
            history.replace('/login');
        }
    }, [isResetPassword, history])

    if(isUserLoggedIn || !getUserEmail) {
        history.replace('/');
    }

    return(
        <>
            <div className={styles.wrapper}>
                <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
                <form   onSubmit={passwordResetHandler}
                        className={styles.form}>
                    <div className={`${styles.container} mt-6`}>
                        <PasswordInput
                            type='text'
                            placeholder='Введите новый пароль'
                            onChange={onChange}
                            value={value.password}
                            name='password'
                            error={false}
                            icon={'ShowIcon'}
                            //onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                        <div className={`${styles.container} mt-6`}>
                            <Input 
                                type='text'
                                placeholder='Введите код из письма'
                                onChange={onChange}
                                value={value.token}
                                name='token'
                                error={false}
                                //onIconClick={onIconClick}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                    </div>
                    <div className="mt-6 mb-20">
                        <Button type="primary" size="medium">
                            Восстановить
                        </Button>
                    </div>
                </form>
                <div className={styles.line}>
                    <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль?&nbsp;</p>
                    <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
                </div>
            </div>
        </>
    )
}