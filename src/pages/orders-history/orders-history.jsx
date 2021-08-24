import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import styles from './orders-history.module.css';

import { Order } from '../../components/order/order';
import { getIngredients } from '../../services/actions/ingredients';
import {
    WS_PROFILE_CONNECTION_START,
    WS_CONNECTION_END,
    WS_SEND_PONG_MESSAGE,
    wsConnectionClosed
} from '../../services/actions/websockets'; 
import { getUserInfo } from '../../services/actions/user';

export const OrdersHistoryPage = () => {
    let location = useLocation();
    const { ingredients } = useSelector(state => state.ingredients);
    const {  profileOrders } = useSelector(state => state.wsStore);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: WS_PROFILE_CONNECTION_START});
        // if(ingredients.length === 0){
        //     dispatch(getIngredients());
        // }
        // const pingPong = setInterval(() => {
        //     dispatch({type: WS_SEND_PONG_MESSAGE})
        // }, 10000);
        // return () => {
        //     clearInterval(pingPong);
        //     dispatch({type: WS_CONNECTION_END});
        // };
        return () => dispatch(wsConnectionClosed())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {profileOrders?.map((item) => 
                <Link
                    key={item._id}
                    className={styles.link}
                    to={{
                    pathname: `/profile/orders/${item.number}`,
                    state: { background: location },
                    }}>
                    <li
                        className={styles.orderItem}>
                        <Order 
                            className={styles.order}
                            order={item}
                        />
                    </li>
                </Link>
                )}
            </ul>
        </div>
    )
}