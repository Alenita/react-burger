import React, { FC } from 'react';
import orderCardStyles from './order.module.css';
import { useSelector } from '../../services/hooks';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';

import { getStatus, getDate } from '../../utils/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/data';

interface IOrder {
    orderNumber: number,
    name: string,
    ingredientsId: string[],
    createdAt: string,
    status: "done" | "pending" | "created",
}

export const Order: FC<IOrder> = ({orderNumber, name, ingredientsId, createdAt, status}) => {
    const location = useLocation();
    const { ingredients } = useSelector(state => state.ingredients);

    const orderedIngredients: TIngredient[] = [];
    let sum = 0;
    
    ingredientsId.forEach((id) => {
        const foundIngredient = ingredients.find((item) => item._id === id);
        sum = sum + foundIngredient!.price;
        if (foundIngredient && !orderedIngredients.includes(foundIngredient)) {
            orderedIngredients.push(foundIngredient)
        }
    });

    const fontColor = status === 'done' ? '#00CCCC' : '#F2F2F3';

    return ( 
        <section className={orderCardStyles.section}>
            <div className={orderCardStyles.container}>
                <div className={orderCardStyles.line}>
                    <span className='text text_type_digits-default'>#{orderNumber}</span>
                    <p className='text text_type_main-default text_color_inactive'>{getDate(createdAt)}</p>
                </div>
                <p className="text text_type_main-medium mb-6 mt-6">{name}</p> 
                {location.pathname==='/profile/orders' ? <p className="text text_type_main-default pb-6" style={{color: fontColor}}>{getStatus(status)}</p> : ''}
                <div className={orderCardStyles.line}>
                    <ul className={orderCardStyles.icons}>
                        {orderedIngredients.map((item, index) => 
                            index < 5 ?
                                <li key={nanoid()} className={orderCardStyles.wrapper} style={{zIndex: 20-index}}>
                                    <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                </li> 
                            : index===5 && 
                            <>
                                { orderedIngredients.length > 6 
                                    ? 
                                        <li key={nanoid()} className={orderCardStyles.last} style={{zIndex: 20-index}}>
                                            <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                            <span className={`${orderCardStyles.lastAmount} text text_type_main-default`}>+{orderedIngredients.length - 6}</span>
                                        </li> 
                                    : 
                                        <li key={nanoid()} className={orderCardStyles.wrapper} style={{zIndex: 20-index}}>
                                            <img className={orderCardStyles.icon} src={item?.image_mobile} alt=''/>
                                        </li> 
                                }
                            </>
                        )}
                    </ul>
                    <div className={orderCardStyles.price}>
                        <p className="text text_type_digits-default mr-2">{sum}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
                {/* <p>{order.status}</p> */}
            </div>
        </section>
    )
}