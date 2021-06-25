import React from "react";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-footer.module.css";

const ConstructorFooter = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.price}>
                <p className={`text text_type_digits-medium mr-2`}>
                    610
                </p>
                <CurrencyIcon className={styles.currencyIcon} type="primary" />
            </div>
            <Button type="primary" size="large">
                Оформить заказ
            </Button>
        </footer>
    )
};

export default ConstructorFooter;