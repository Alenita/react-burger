import React, { FC } from 'react';

import styles from './orders.module.css';
import { Order } from '../order/order'; 
import { TOrder } from '../../services/types/data';

interface IOrders {
    orders: TOrder[]
}

export const Orders: FC<IOrders> = ({orders}) => {

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <ul className={styles.list}>
                {orders?.map((item) => 
                    <li key={item._id}
                        className={styles.orderItem}>
                        <Order 
                            orderNumber={item.number}
                            name={item.name} 
                            ingredientsId={item.ingredients} 
                            createdAt={item.createdAt} 
                            status={item.status}
                        />
                    </li>
                    )}
                </ul>
            </div>
        </section>
    )
}

