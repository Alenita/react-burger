import React, {useState} from "react";
import PropTypes from "prop-types";
import tabsStyles from "./tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Tabs = ({onTabClick}) => {
    const [current, setCurrent] = useState("bun");

    const handleTabChange = (data) => {
        setCurrent(data);
        onTabClick(data);
    }

    return (
        <ul className={tabsStyles.tabs}>
            <li className={tabsStyles.item} >
                <Tab 
                    value="bun" 
                    active={current === "bun"} 
                    onClick={handleTabChange}>
                    Булки
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab
                    value="sauce" 
                    active={current === "sauce"} 
                    onClick={handleTabChange}>
                    Соусы
                </Tab>
            </li>
            <li className={tabsStyles.item}>
                <Tab 
                    value="stuffing" 
                    active={current === "stuffing"} 
                    onClick={handleTabChange}>
                    Начинки
                </Tab>
            </li>
        </ul>
    )
};

Tabs.propTypes = {
    onTabClick: PropTypes.func.isRequired,
}

export default Tabs;