import React from 'react';
import headerStyles from './app-header.module.css';
import { NavLink, useHistory } from 'react-router-dom';

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const Header = () => {
    const history = useHistory();
    
    const mainIsActive = history.location.pathname === '/'; 
    const feedIsActive = history.location.pathname === '/feed';
    const profileIsActive = history.location.pathname === '/profile' || history.location.pathname === '/profile/orders';

    return(
        <header className={`${headerStyles.header} pb-4 pt-4`} >
            <nav className={headerStyles.nav} >
                <div className={`${headerStyles.container}`}>
                    <div className={`${headerStyles.container} pr-5 pb-4 pt-4`}>
                        <NavLink   to={{pathname: `/`}}
                            activeStyle={{color: "#F2F2F3"}}
                            className={`${headerStyles.link} text text_type_main-default ml-2 text_color_inactive`}
                            exact={true}
                        >
                            <BurgerIcon type={mainIsActive ? 'primary' : 'secondary'}/>
                            <p className="text text_type_main-default ml-2">
                                Конструктор
                            </p>
                        </NavLink>
                    </div>
                    <div className={`${headerStyles.container} ml-2 pl-5 pr-5 pb-4 pt-4`}>
                        <NavLink  to={{pathname: `/feed`}}
                                activeStyle={{color: "#F2F2F3"}}
                                className={`${headerStyles.link} text text_type_main-default ml-2  ml-2 text_color_inactive`}
                                exact={true}
                            >
                            <ListIcon type={feedIsActive ? 'primary' : 'secondary'} />
                            <p className={`text text_type_main-default ml-2`}>
                                Лента заказов
                            </p>
                        </NavLink>
                    </div>
                </div>
                <NavLink to='/'
                    className={headerStyles.logocontainer}>
                    <Logo />
                </NavLink>
                <div className={`${headerStyles.container} pl-5 pb-4 pt-4`}>
                    <NavLink   to={{pathname: `/profile`}}
                        activeStyle={{color: "#F2F2F3"}}
                        className={`${headerStyles.link} text text_type_main-default ml-2 text_color_inactive`}
                    >
                        <ProfileIcon type={profileIsActive ? 'primary' : 'secondary'}/>
                        <p className="text text_type_main-default ml-2">
                            Личный кабинет
                        </p>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
};