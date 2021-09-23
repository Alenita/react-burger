import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useLocation, Link } from 'react-router-dom';
import styles from './orders-history.module.css';

import { Order } from '../../components/order/order';
import {
    wsProfileConnect,
    wsConnectionClosed
} from '../../services/actions/websockets'; 
import { getUserInfo } from '../../services/actions/user';
import { TOrder } from '../../services/types/data';

export const OrdersHistoryPage = () => {
    let location = useLocation();
    const {  feedOrders } = useSelector(state => state.wsStore);
    const dispatch = useDispatch();

    useEffect(
        () => {
        dispatch(getUserInfo());
        dispatch(wsProfileConnect());
        return (): void => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {feedOrders?.map((item: TOrder) => 
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
                            orderNumber={item.number}
                            name={item.name}
                            ingredientsId={item.ingredients}
                            status={item.status}
                            createdAt={item.createdAt}
                            // order={item}
                        />
                    </li>
                </Link>
                )}
            </ul>
        </div>
    )
}