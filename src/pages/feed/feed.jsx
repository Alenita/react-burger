import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './feed.module.css';
import { Link, useLocation } from 'react-router-dom';

import { Order } from '../../components/order/order';
import { OrdersQueue } from '../../components/orders-queue/orders-queue';
import { getIngredients } from '../../services/actions/ingredients';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_END,
    WS_SEND_PONG_MESSAGE
} from '../../services/actions/websockets'; 

export const FeedPage = () => {
    const location = useLocation();
    const { ingredients } = useSelector(state => state.ingredients);
    const { orders } = useSelector(state => state.wsStore.feedOrders)
    // const {  wsConnected, orders, total, totalToday } = useSelector(state => state.wsStore);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type: WS_CONNECTION_START});
        if(ingredients.length === 0){
            dispatch(getIngredients());
        }
        const pingPong = setInterval(() => {
            dispatch({type: WS_SEND_PONG_MESSAGE})
        }, 10000);
        return () => {
            clearInterval(pingPong);
            dispatch({type: WS_CONNECTION_END});
        };
    }, []);

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={styles.wrapper}>
                <div className={styles.section}>
                    <ul className={styles.list}>
                    {orders?.map((item) => 
                        <Link 
                        className={styles.link}
                        to= {{ pathname: `/feed/${item._id}`, 
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