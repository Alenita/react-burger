import React, { useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';

import styles from './constructor-footer.module.css';
import { Modal } from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNumber } from '../../services/actions/order';
import { resetConstructor } from '../../services/actions/constructor-action';
import { getUserInfo } from '../../services/actions/user';

const ConstructorFooter = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { constructorIngredients, topBun, bottomBun } = useSelector(state => state.constructorStore);
    const { isUserLoggedIn } = useSelector(state => state.userData);
    const { orderId } = useSelector(state => state.order);
    const [ detailsOpen, setDetailsOpen ] = useState(false);
    
    const totalSum =  (topBun?.price || 0) + (bottomBun?.price || 0) + constructorIngredients?.reduce((acc, item) => {return acc + item.price}, 0);
        

    const closeDetailsHandler = () => {
        setDetailsOpen(false);
    }

    const allIngredients = [...constructorIngredients, topBun, bottomBun];

    const orderDetailsHandler = () => {
        if (!topBun) {
            return;
        }
        if (!isUserLoggedIn) {
            history.replace('/login');
        } else {
            dispatch(getUserInfo());
            dispatch(getOrderNumber(allIngredients?.map(item=> item?._id)));
            setDetailsOpen(true);
            dispatch(resetConstructor());
        }
    };

    return (
        <footer className={styles.container}>
            <div className={styles.price}>
                <p className={`text text_type_digits-medium mr-2`} data-test-id='total-cost'>
                    {totalSum || 0}
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