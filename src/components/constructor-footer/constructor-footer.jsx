import React, { useState } from "react";

import styles from "./constructor-footer.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const ConstructorFooter = () => {
    const [ detailsOpen, setDetailsOpen ] = useState(false);

    const openDetailsHandler = () => {
        setDetailsOpen(true);
    }

    const closeDetailsHandler = () => {
        setDetailsOpen(false);
    }

    return (
        <footer className={styles.container}>
            <div className={styles.price}>
                <p className={`text text_type_digits-medium mr-2`}>
                    610
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick = {openDetailsHandler} type="primary" size="large">
                Оформить заказ
            </Button>
            {detailsOpen && 
                <Modal  onClose={closeDetailsHandler}>
                    <OrderDetails/>
                </Modal>
            }
        </footer>
    )
};

export default ConstructorFooter;