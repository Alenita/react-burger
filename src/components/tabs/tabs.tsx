import React, { FC } from "react";
import PropTypes from "prop-types";
import tabsStyles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

type TIngredientType =
  | 'bun'
  | 'main'
  | 'sauce';

interface ITab {
    onTabClick?: (data: TIngredientType) => void,
    current: string
}

const Tabs: FC<ITab> = ({onTabClick, current}) => {
    const tabClickHandler = (data: string) => {
        onTabClick && onTabClick(data as TIngredientType)
    }

    return (
        <ul className={tabsStyles.tabs}>
            <li className={tabsStyles.item} >
                <Tab 
                    value="bun" 
                    active={current === "bun"} 
                    onClick={tabClickHandler}>
                    Булки
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab
                    value="sauce" 
                    active={current === "sauce"} 
                    onClick={tabClickHandler}>
                    Соусы
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab 
                    value="main" 
                    active={current === "main"} 
                    onClick={tabClickHandler}>
                    Начинки
                </Tab>
            </li>
        </ul>
    )
};

Tabs.propTypes = {
    onTabClick: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
}

export default Tabs;