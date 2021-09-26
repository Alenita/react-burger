import React, { useState, SyntheticEvent } from 'react';
import { NavLink, Switch, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './profile.module.css';

import { getUserLogout, getUserInfoUpdate } from '../../services/actions/user';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { OrderPage } from '../order-page/order-page';

export const ProfilePage = () => {
    const location = useLocation();
    const { user } = useSelector(state => state.userData)
    const dispatch = useDispatch();

    const [ userName, setUserName ] = useState(user!.name);
    const [ userEmail, setUserEmail ] = useState(user!.email);
    const [ userPassword, setUserPassword ] = useState('');
    const [ disabledInput, setInputDisabled ] = useState(true);
    const [ showButtons, setShowButtons ] = useState(false);

    const onIconClick = () => {
        setInputDisabled(false);
    };

    const logoutUser = () => {
        dispatch(getUserLogout());
    };

    const editDataHandler = (e: SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        dispatch(getUserInfoUpdate(userEmail, userPassword, userName));
        setShowButtons(false);
        setInputDisabled(true);
    };

    const rejectEditDataHandler = () => {
        setUserName(user!.name);
        setUserEmail(user!.email);
        setUserPassword('');
        setShowButtons(false);
        setInputDisabled(true);
    };

    return(
            <>
                <main className={styles.container}>
                    <div className={styles.wrapper} 
                        style={{width: location.pathname==='/profile/orders' ? '100%' : '65%'}}
                    >
                        <div className={styles.left}>
                            <NavLink  to='/profile' exact={true}
                                    activeStyle={{
                                        color: "#F2F2F3"
                                    }}
                                    className={`${styles.link} text text_type_main-medium pb-4 pt-4 text_color_inactive`}>
                                        Профиль
                            </NavLink>
                            <NavLink to='/profile/orders' exact={true}
                                    activeStyle={{
                                        color: "#F2F2F3"
                                    }}
                                    className={`${styles.link} text text_type_main-medium pb-4 pt-4 text_color_inactive`}>
                                        История заказов
                            </NavLink>
                            <NavLink to='/login' onClick={logoutUser}
                                    className={`${styles.link} text text_type_main-medium pb-4 pt-4 text_color_inactive`}>
                                        Выход
                            </NavLink>
                            <div className={styles.text}>
                                <p className='mt-20 text text_type_main-default text_color_inactive'>
                                    В этом разделе вы можете изменить свои персональные данные
                                </p>
                            </div>
                        </div>
                        <Switch>
                        <Route path='/profile' exact={true}>
                            <div className={styles.right}>
                                <form onSubmit={editDataHandler}
                                    className={styles.form}
                                >
                                    <Input 
                                        disabled={disabledInput ? true : false}
                                        icon={'EditIcon'}
                                        type='text'
                                        placeholder='Имя'
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            setShowButtons(true);
                                        }}
                                        value={userName}
                                        name='name'
                                        error={false}
                                        onIconClick={onIconClick}
                                        errorText={'Ошибка'}
                                        size={'default'}
                                    />
                                    <div className={`mt-6`}>
                                        <Input 
                                            disabled={disabledInput ? true : false}
                                            type='text'
                                            icon={'EditIcon'}
                                            placeholder='Логин'
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                                setShowButtons(true);
                                            }}
                                            value={userEmail}
                                            name='email'
                                            error={false}
                                            onIconClick={onIconClick}
                                            errorText={'Ошибка'}
                                            size={'default'}
                                        />
                                    </div>
                                    <div className={`mt-6`}>
                                        <Input 
                                            disabled={disabledInput ? true : false}
                                            onChange={(e) => {
                                                setUserPassword(e.target.value);
                                                setShowButtons(true);
                                            }} 
                                            type='text'
                                            placeholder='Пароль'
                                            icon={'EditIcon'}
                                            value={userPassword}
                                            name='password'
                                            error={false}
                                            // ref={inputRef}
                                            onIconClick={onIconClick}
                                            errorText={'Ошибка'}
                                            size={'default'}
                                        />
                                    </div>
                                    { showButtons && 
                                        <div className={styles.buttons}>
                                            <span onClick={rejectEditDataHandler}
                                                className={`${styles.reject} text text_type_main-default mr-6`}>
                                                    Отмена
                                            </span>
                                            <Button  type="primary" size="medium">
                                                Сохранить
                                            </Button>
                                        </div>
                                    }
                                </form>
                            </div>
                        </Route>
                        <Route path='/profile/orders' exact={true}>
                            <OrdersHistoryPage />
                        </Route>
                        <Route path='/profile/orders/:id'>
                            <OrderPage />
                        </Route>
                    </Switch>
                </div>
            </main>
        </>
    )
}