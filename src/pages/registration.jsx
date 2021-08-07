import React, { useState } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './registration.module.css';
import { getUserRegister } from '../services/actions/user';
import { Input, ShowIcon, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'


export const RegistrationPage = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const { state } = useLocation();

    const { user, accessToken, isUserLoggedIn } = useSelector(state => state.userData)
    const [value, setValue] = useState({ name: '', email: '', password: '' });
    
    const onChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const registerNewUser = (e) => {
        const {email, password, name} = value;
        e.preventDefault();
        dispatch(getUserRegister(email, password, name))
            // .then(({success, errorMessage}) => {
            //     success ? history.replace({pathname: '/login'}) : alert('При регистрациии произошла ошибка' + errorMessage);
            // })
            if(user && accessToken) {
                history.replace({pathname: '/login'})
            }
        };

    if (isUserLoggedIn) {
        return <Redirect to={state?.from || '/'} />
    };

    return(
        <>
            <div className={styles.wrapper}>
                <h2 className={`${styles.title} text text_type_main-medium`}>Регистрация</h2>
                <form   onSubmit={registerNewUser}
                        className={styles.form}>
                    <Input 
                        type='text'
                        placeholder='Имя'
                        onChange={onChange}
                        value={value.name}
                        name='name'
                        error={false}
                        //onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <div className={`${styles.container} mt-6`}>
                        <Input 
                            onChange={onChange} 
                            type='text'
                            placeholder='E-mail'
                            value={value.email}
                            name='email'
                            error={false}
                            // ref={inputRef}
                            //onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
                    <div className={`${styles.container} mt-6`}>
                        <PasswordInput
                            onChange={onChange} 
                            type='text'
                            placeholder='Пароль'
                            icon={ShowIcon}
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
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <div className={`${styles.line}  mb-20`}>
                    <p className='mt-4 text text_type_main-default text_color_inactive'>Уже зарегистрированы?&nbsp;</p>
                    <Link className={`${styles.link} text text_type_main-default`} to='/login'>Войти</Link>
                </div>
            </div>
        </>
    )
}