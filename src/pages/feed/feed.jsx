import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';

import { Order } from '../../components/order/order';
import { OrdersQueue } from '../../components/orders-queue/orders-queue';
import {
    WS_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/websockets'; 

export const FeedPage = () => {
    const location = useLocation();
    const { feedOrders } = useSelector(state => state.wsStore)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: WS_CONNECTION_START});
        return () => dispatch(wsConnectionClosed())
    }, [dispatch]);

    return ( 
        <div className={styles.container}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <ul className={styles.list}>
                    {feedOrders?.map((item) => 
                        <Link 
                        className={styles.link}
                        to= {{ 
                            pathname: `/feed/${item.number}`, 
                            state: {background: location} 
                        }}>
                            <li key={item._id}
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
                <div className={styles.section}>
                    <OrdersQueue />
                </div>
            </div>
        </div>
    )
}