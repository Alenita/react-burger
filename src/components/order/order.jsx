import React, { useEffect } from 'react';
import orderCardStyles from './order.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';

import { getStatus, getDate } from '../../utils/utils';
import { getIngredients } from '../../services/actions/ingredients';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Order = ({order}) => {
    const location = useLocation();
    const { ingredients } = useSelector(state => state.ingredients);
    const dispatch = useDispatch();

    const orderedIngredients = [];
    let sum = 0;

    useEffect(()=> {
        if(ingredients.length===0){
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients.length]);
    
    order.ingredients.forEach((ingredient) => {
        const foundIngredient = ingredients.find((item) => item._id === ingredient);
        sum = sum + (foundIngredient?.type === 'bun' ? foundIngredient?.price*2 : foundIngredient?.price)
        orderedIngredients.push(foundIngredient)
    });

    return (
        <section className={orderCardStyles.section}>
            <div className={orderCardStyles.container}>
                <div className={orderCardStyles.line}>
                    <span className='text text_type_digits-default'>#{order.number}</span>
                    <p className='text text_type_main-default text_color_inactive'>{getDate(order.createdAt)}</p>
                </div>
                <p className="text text_type_main-medium mb-6 mt-6">{order.name}</p> 
                {location.pathname==='/profile/orders' ? <p className="text text_type_main-default pb-6" style={{color: getStatus(order.status)==='Выполнен' && '#00CCCC'}}>{getStatus(order.status)}</p> : ''}
                <div className={orderCardStyles.line}>
                    <ul className={orderCardStyles.icons}>
                        {orderedIngredients.map((item, index) => 
                            index < 5 ?
                                <li key={nanoid()} className={orderCardStyles.wrapper} style={{zIndex: `${20-index}`}}>
                                    <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                </li> 
                            : index===5 && 
                            <>
                                { orderedIngredients.length > 6 
                                    ? 
                                        <li key={nanoid()} className={orderCardStyles.last} style={{zIndex: `${20-index}`}}>
                                            <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                            <span className={`${orderCardStyles.lastAmount} text text_type_main-default`}>+{orderedIngredients.length - 6}</span>
                                        </li> 
                                    : 
                                        <li key={nanoid()} className={orderCardStyles.wrapper} style={{zIndex: `${20-index}`}}>
                                            <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                        </li> 
                                }
                            </>
                        )}
                    </ul>
                    <div className={orderCardStyles.price}>
                        <p className="text text_type_digits-default mr-2">{sum}</p>
                        <CurrencyIcon />
                    </div>
                </div>
                {/* <p>{order.status}</p> */}
            </div>
        </section>
    )
}