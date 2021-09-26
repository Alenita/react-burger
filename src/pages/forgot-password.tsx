import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';

import styles from './registration.module.css';
import { getUserForgotPassword } from '../services/actions/user';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

interface ILocationState {
    from: {
        pathname: string
    }
}

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { state } = useLocation<ILocationState>();
    const { isUserLoggedIn, getUserEmail } = useSelector(state => state.userData)

    const [email, setEmail] = useState('');
    
    const sendEmailHandler = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        dispatch(getUserForgotPassword(email));    
    }

    useEffect(() => {
        if (getUserEmail) {
            history.replace('/reset-password');
        }
    }, [getUserEmail, history]);
    
    if (isUserLoggedIn) {
        return <Redirect to={state?.from || '/'} />
    }

    return(
        <>
            <div className={styles.wrapper}>
                <h2 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h2>
                <form className={styles.form} onSubmit={sendEmailHandler}>
                    <div className={`${styles.container} mt-6`}>
                        <Input 
                            type='text'
                            placeholder='Укажите e-mail'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name='email'
                            error={false}
                            //onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className="mt-6 mb-20">
                        <Button 
                            type="primary" 
                            size="medium"
                        >
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