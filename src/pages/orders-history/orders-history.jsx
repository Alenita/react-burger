import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import styles from './orders-history.module.css';

import { Order } from '../../components/order/order';
import {
    WS_PROFILE_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/websockets'; 
import { getUserInfo } from '../../services/actions/user';

export const OrdersHistoryPage = () => {
    let location = useLocation();
    const {  profileOrders } = useSelector(state => state.wsStore);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getUserInfo());
        dispatch({type: WS_PROFILE_CONNECTION_START});
        return () => dispatch(wsConnectionClosed())
    }, [dispatch]);

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