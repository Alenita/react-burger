import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import headerStyles from './app-header.module.css';

const Header = () => {
    return(
        <header className={`${headerStyles.header} pb-4 pt-4`} >
            <nav className={headerStyles.nav} >
                <div className={`${headerStyles.container}`}>
                    <div className={`${headerStyles.container} pr-5 pb-4 pt-4`}>
                        <BurgerIcon type="primary" />
                        <p className={`${headerStyles.text} text text_type_main-medium ml-2`}>
                            Конструктор
                        </p>
                    </div>
                    <div className={`${headerStyles.container} ml-2 pl-5 pr-5 pb-4 pt-4`}>
                        <ListIcon type="secondary" />
                        <p className={`${headerStyles.secondarytext} text text_type_main-medium ml-2`}>
                            Лента заказов
                        </p>
                    </div>
                </div>
                <div className={headerStyles.logocontainer}>
                    <Logo />
                </div>
                <div className={`${headerStyles.container} pl-5 pr-5 pb-4 pt-4`}>
                    <ProfileIcon type="secondary" />
                    <p className={`${headerStyles.secondarytext} text text_type_main-medium ml-2`}>
                        Личный кабинет
                    </p>
                </div>
            </nav>
        </header>
    )
};

export default Header;