import React from "react";
import PropTypes from "prop-types";
import tabsStyles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({onTabClick, current}) => {

    return (
        <ul className={tabsStyles.tabs}>
            <li className={tabsStyles.item} >
                <Tab 
                    value="bun" 
                    active={current === "bun"} 
                    onClick={onTabClick}>
                    Булки
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab
                    value="sauce" 
                    active={current === "sauce"} 
                    onClick={onTabClick}>
                    Соусы
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab 
                    value="stuffing" 
                    active={current === "stuffing"} 
                    onClick={onTabClick}>
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