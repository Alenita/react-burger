import React from 'react';
import headerStyles from './app-header.module.css';
import { NavLink, useHistory } from 'react-router-dom';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const Header = () => {
    return(
        <header className={`${headerStyles.header} pb-4 pt-4`} >
            <nav className={headerStyles.nav} >
                <div className={`${headerStyles.container}`}>
                    <div className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4`}>
                        <NavLink    to={{pathname: `/`}}
                                    activeStyle={{color: "#F2F2F3"}}
                                    className={`${headerStyles.link} text text_type_main-default ml-2 text_color_inactive`}
                                    exact={true}
                        >
                            <BurgerIcon/>
                            <p className="text text_type_main-default ml-2">
                                Конструктор
                            </p>
                        </NavLink>
                    </div>
                    <div className={`${headerStyles.container} ml-2 pl-5 pr-5 pb-4 pt-4`}>
                    <NavLink    to={{pathname: `/profile/orders`}}
                                    activeStyle={{color: "#F2F2F3"}}
                                    className={`${headerStyles.link} text text_type_main-default ml-2  ml-2 text_color_inactive`}
                                    exact={true}
                        >
                        <ListIcon type="secondary" />
                        <p className={`text text_type_main-default ml-2`}>
                            Лента заказов
                        </p>
                    </NavLink>
                    </div>
                </div>
                <div className={headerStyles.logocontainer}>
                    <Logo />
                </div>
                <div className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4`}>
                    <NavLink    to={{pathname: `/profile`}}
                                activeStyle={{color: "#F2F2F3"}}
                                className={`${headerStyles.link} text text_type_main-default ml-2 text_color_inactive`}
                                exact={true}
                    >
                        <ProfileIcon/>
                        <p className="text text_type_main-default ml-2">
                            Личный кабинет
                        </p>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
};