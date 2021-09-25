import React from 'react';
import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getStatus, getDate } from '../../utils/utils';
import { TIngredient, TOrder } from '../../services/types/data';

export const OrderInfo = () => {
    const { id } = useParams<{ id?: string }>();
    const orders = useSelector(state => state.wsStore.feedOrders); 
    const { ingredients, ingredientsRequest, ingredientsError } = useSelector(state => state.ingredients);
    let order = orders.find((item: TOrder) => item.number === Number(id));
    let orderedIngredients: TIngredient[] = [];
    let sum = 0;

    order?.ingredients.forEach((ingredient) => {
        const foundIngredient = ingredients.find((item) => item._id === ingredient);
        sum = sum + foundIngredient!.price
        if (foundIngredient && !orderedIngredients.includes(foundIngredient)) {
            orderedIngredients.push(foundIngredient)
        }
    });

    const getQuantity = (ingredient: string) => {
        return order?.ingredients.filter(item => item === ingredient).length
    }

    const fontColor = order?.status === 'done' ? '#00CCCC' : '#F2F2F3';

    return( 
        (ingredients.length > 0 && !ingredientsRequest && !ingredientsError && order) ?
        <section className={styles.section}>
            <div className={styles.header}>
                <span className="text text_type_digits-default mb-10">#{order.number}</span>
            </div>
            <h2 className="text text_type_main-medium">{order.name}</h2>
            <span className={`${styles.status} text text_type_main-default`} style={{color: fontColor}}>{getStatus(order.status)}</span>
            <p className="text text_type_main-medium">Состав:</p>
            <ul className={styles.ingredientsList}>
                {orderedIngredients.map((ingredient: TIngredient) => 
                    <li key={ingredient._id} className={styles.item}>
                        <div className={styles.right}>
                            <img className={styles.icon} src={ingredient.image_mobile} alt={ingredient.name} />
                            <p className="text text_type_main-default">{ingredient.name}</p>
                        </div>
                        <div className={styles.left}>
                            <span className='text_type_digits-default mr-2'>{getQuantity(ingredient._id)} x {ingredient.price}</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </li>
                )}
            </ul>
            <div className={styles.line}>
                <p className='text text_type_main-default text_color_inactive'>{getDate(order.createdAt)}</p>
                <div className={styles.left}>
                    <span className='text_type_digits-default mr-2'>{sum}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
        : null
    )
};