import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';

import { Order } from '../../components/order/order';
import { OrdersQueue } from '../../components/orders-queue/orders-queue';
import {
    wsConnect,
    wsConnectionClosed
} from '../../services/actions/websockets'; 

export const FeedPage = () => {
    const location = useLocation();
    const { feedOrders } = useSelector(state => state.wsStore)
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(wsConnect());
            return (): void => {
                dispatch(wsConnectionClosed())
            }
        }, [dispatch]
    );

    return ( 
        <div className={styles.container}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <ul className={styles.list}>
                    {feedOrders?.map((item) => 
                        <Link 
                        className={styles.link}
                        key={item._id}
                        to= {{ 
                            pathname: `/feed/${item.number}`, 
                            state: {background: location} 
                        }}>
                            <li 
                                className={styles.orderItem}>
                                <Order 
                                    orderNumber={item.number}
                                    name={item.name} 
                                    ingredientsId={item.ingredients} 
                                    createdAt={item.createdAt} 
                                    status={item.status}
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