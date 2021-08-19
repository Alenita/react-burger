import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './orders.module.css';
import { Order } from '../order/order'; 

export const Orders = ({orders}) => {
    // const { ingredients } = useSelector(state => state.ingredients);
    // const { orders } = useSelector(state => state.wsStore.feedOrders)
    const dispatch = useDispatch();

    // const orderedIngredients = [];
    // ingredients.forEach(item => console.log(item._id))
    // orders.ingredients?.forEach((ingredient) => {
    //     const foundIngredient = ingredients.find((item) => item._id === ingredient);
    //     console.log(foundIngredient)
    //     // foundIngredient['count'] = order.ingredients.filter(item => item === ingredient).length;
    //     orderedIngredients.push(foundIngredient)
    // });
    // console.log(orderedIngredients)
    // // const ingredientsArray = 
    // // ingredients.filter(ingredient => ingredient._id === order)
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <ul className={styles.list}>
                {orders?.map((item) => 
                    <li key={item._id}
                        className={styles.orderItem}>
                        <Order 
                            className={styles.order}
                            order={item}
                        />
                    </li>
                    )}
                </ul>
            </div>
        </section>
    )
}

