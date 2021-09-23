import React, { useEffect } from 'react';
import styles from './order-page.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getStatus, getDate } from '../../utils/utils';
import { getOrderCardDetails } from '../../services/actions/order';
import { TIngredient } from '../../services/types/data';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id?: string }>();
    console.log(id)
    const { ingredients, ingredientsRequest, ingredientsError } = useSelector(state => state.ingredients);
    const { orderCardDetails } = useSelector(state => state.order )

    useEffect(() => {
        dispatch(getOrderCardDetails(id))
    },[dispatch])

    let orderedIngredients: TIngredient[] = [];
    let sum = 0;

    orderCardDetails.ingredients?.forEach((ingredient: string) => {
        const foundIngredient = ingredients.find((item) => item._id === ingredient);
        sum = sum + foundIngredient!.price
        if (foundIngredient && !orderedIngredients.includes(foundIngredient)) {
            orderedIngredients.push(foundIngredient)
        }
    });

    const getQuantity = (ingredient: string) => {
        return orderCardDetails.ingredients.filter((item: string) => item === ingredient).length
    };

    const orderDate = () => {
        return orderCardDetails.createdAt ? getDate(orderCardDetails.createdAt) : null
    };

    const fontColor = orderCardDetails?.status === 'done' ? '#00CCCC' : '#F2F2F3';

    return( 
        orderCardDetails && ingredients.length !==0 && !ingredientsRequest &&
        <section className={styles.section}>
            <div className={styles.header}>
                <span className="text text_type_digits-default mb-10">#{orderCardDetails.number}</span>
            </div>
            <h2 className="text text_type_main-medium">{orderCardDetails.name}</h2>
            <span className={`${styles.status} text text_type_main-default`} style={{color: fontColor}}>{getStatus(orderCardDetails.status)}</span>
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
                <p className='text text_type_main-default text_color_inactive'>{orderDate}</p>
                <div className={styles.left}>
                    <span className='text_type_digits-default mr-2'>{sum}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </section>
    )
};