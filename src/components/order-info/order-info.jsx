import React, { useEffect } from 'react';
import styles from './order-info.module.css';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getStatus, getDate } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredients';

import { WS_CONNECTION_START, WS_PROFILE_CONNECTION_START } from '../../services/actions/websockets'; 

export const OrderInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const match = useRouteMatch("/profile/orders/:id");
    const { orders } = useSelector(state => match ? state.wsStore.profileOrders : state.wsStore.feedOrders);
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(()=> {
        dispatch(getIngredients());
        match ? dispatch({type: WS_CONNECTION_START}) : dispatch({type: WS_PROFILE_CONNECTION_START})
    }, [dispatch, ingredients.length, match]);

    const order = orders.find((item) => item._id === id);

    const orderedIngredients = [];
    let sum = 0;

    order?.ingredients.forEach((ingredient) => {
        const foundIngredient = ingredients.find((item) => item._id === ingredient);
        sum = sum + (foundIngredient?.type === 'bun' ? foundIngredient?.price*2 : foundIngredient?.price)
        orderedIngredients.push(foundIngredient)
    });
    
    const uniqueIngredients = [...new Set(orderedIngredients)];

    const getQuantity = (ingredient) => {
        return order.ingredients.filter(item => item === ingredient).length
    }

    // const getSum = () => {
    //         order.ingredients.price?.reduce((acc, item) => {
    //             const amount = getQuantity(item)
    //             return acc + item.type==='bun' ? item.price*2 : item.price*amount}, 0)
    // }

    return( order &&
        <section className={styles.section}>
            <div className={styles.header}>
                <span className="text text_type_digits-default mb-10">#{order.number}</span>
            </div>
            <h2 className="text text_type_main-medium">{order.name}</h2>
            <span className={`${styles.status} text text_type_main-default`} style={{color: getStatus(order.status)==='Выполнен' && '#00CCCC'}}>{getStatus(order.status)}</span>
            <p className="text text_type_main-medium">Состав:</p>
            <ul className={styles.ingredientsList}>
                {uniqueIngredients.map((ingredient) => 
                    <li key={ingredient._id} className={styles.item}>
                        <div className={styles.right}>
                            <img className={styles.icon} src={ingredient.image_mobile} alt={ingredient.name} />
                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </div>
                        <div className={styles.left}>
                            <span className='text_type_digits-default mr-2'>{getQuantity(ingredient._id)} x {ingredient.price}</span>
                            <CurrencyIcon />
                        </div>
                    </li>
                )}
            </ul>
            <div className={styles.line}>
                <p className='text text_type_main-default text_color_inactive'>{getDate(order.createdAt)}</p>
                <div className={styles.left}>
                    <span className='text_type_digits-default mr-2'>{sum}</span>
                    <CurrencyIcon />
                </div>
            </div>
        </section>
    )
};