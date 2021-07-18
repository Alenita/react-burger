import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './constructor-footer.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../services/actions/order';
import { resetConstructor } from '../../services/actions/constructor-action';

const ConstructorFooter = () => {
    const { constructorIngredients, bun } = useSelector(state => state.constructorStore);
    const { orderId } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [ detailsOpen, setDetailsOpen ] = useState(false);

    const mainIngredientsCost = constructorIngredients?.reduce((acc, item) => {return acc + item.price}, 0);
    const totalSum = mainIngredientsCost + bun?.price*2;

    const closeDetailsHandler = () => {
        setDetailsOpen(false);
    }

    const orderDetailsHandler = () => {
        if (!bun) {
            return;
        }
        dispatch(getOrderNumber(constructorIngredients.map(item=> item._id)));
        setDetailsOpen(true);
        dispatch(resetConstructor());
    };

    return (
        <footer className={styles.container}>
            <div className={styles.price}>
                <p className={`text text_type_digits-medium mr-2`}>
                    {totalSum || mainIngredientsCost || 0}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <Button onClick = {orderDetailsHandler} type="primary" size="large">
                Оформить заказ
            </Button>
            {detailsOpen && 
                <Modal  onClose={closeDetailsHandler}>
                    <OrderDetails orderId={orderId}/>
                </Modal>
            }
        </footer>
    )
};

export default ConstructorFooter;