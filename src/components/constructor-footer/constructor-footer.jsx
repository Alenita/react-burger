import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './constructor-footer.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../services/actions/order';
import { resetConstructor } from '../../services/actions/constructor-action';

const ConstructorFooter = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { constructorIngredients, bun } = useSelector(state => state.constructorStore);
    const { isUserLoggedIn } = useSelector(state => state.userData);
    const { orderId } = useSelector(state => state.order);
    const [ detailsOpen, setDetailsOpen ] = useState(false);

    const mainIngredientsCost = constructorIngredients?.reduce((acc, item) => {return acc + item.price}, 0);
    const totalSum = mainIngredientsCost + bun?.price*2;

    const closeDetailsHandler = () => {
        setDetailsOpen(false);
    }

    const allIngredients = [...constructorIngredients, bun];

    const orderDetailsHandler = () => {
        if (!bun) {
            return;
        }
        if (!isUserLoggedIn) {
            history.replace('/login');
        } else {
            dispatch(getOrderNumber(allIngredients.map(item=> item._id)));
            setDetailsOpen(true);
            dispatch(resetConstructor());
        }
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
                <Modal  closeHandler={closeDetailsHandler}>
                    <OrderDetails orderId={orderId}/>
                </Modal>
            }
        </footer>
    )
};

export default ConstructorFooter;