import React, { useEffect } from 'react';
import styles from './order-info.module.css';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getStatus, getDate } from '../../utils/utils';
// import { getIngredients } from '../../services/actions/ingredients';
// import { WS_CONNECTION_START, WS_PROFILE_CONNECTION_START } from '../../services/actions/websockets'; 
import { getOrderCardDetails } from '../../services/actions/order';

export const OrderInfo = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const match = useRouteMatch("/profile/orders/:id");
    const { orderCardDetails } = useSelector(state => state.order)
    const { orders } = useSelector(state => match ? state.wsStore.profileOrders : state.wsStore.feedOrders);
    const { ingredients, ingredientsRequest, ingredientsError } = useSelector(state => state.ingredients);

    // useEffect(()=> {
        // dispatch(getIngredients());
    //     match ? dispatch({type: WS_CONNECTION_START}) : dispatch({type: WS_PROFILE_CONNECTION_START})
    // }, [dispatch, ingredients.length, match]);

    let number = orders.find((item) => item._id === id).number;
    console.log(number)

    useEffect(() => {
        dispatch(getOrderCardDetails(2045))
    },[dispatch, number])
    console.log(orderCardDetails)

    const orderedIngredients = [];
    let sum = 0;

    orderCardDetails.ingredients.forEach((ingredient) => {
        const foundIngredient = ingredients.find((item) => item._id === ingredient);
        sum = sum + foundIngredient?.price
        orderedIngredients.push(foundIngredient)
    });

    const uniqueIngredients = [...new Set(orderedIngredients)];

    const getQuantity = (ingredient) => {
        return orderCardDetails.ingredients.filter(item => item === ingredient).length
    }

    return( 
        (ingredients.length > 0 && !ingredientsRequest && !ingredientsError && orderCardDetails) ?
        <section className={styles.section}>
            <div className={styles.header}>
                <span className="text text_type_digits-default mb-10">#{orderedIngredients.number}</span>
            </div>
            <h2 className="text text_type_main-medium">{orderedIngredients.name}</h2>
            <span className={`${styles.status} text text_type_main-default`} style={{color: getStatus(orderedIngredients.status)==='Выполнен' && '#00CCCC'}}>{getStatus(orderedIngredients.status)}</span>
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
                {/* <p className='text text_type_main-default text_color_inactive'>{getDate(orderCardDetails.createdAt)}</p> */}
                <div className={styles.left}>
                    <span className='text_type_digits-default mr-2'>{sum}</span>
                    <CurrencyIcon />
                </div>
            </div>
        </section>
        : <p className="text text_type_main-medium text_color_inactive">У нас сейчас нет такого ингредиента.</p>
    )
};