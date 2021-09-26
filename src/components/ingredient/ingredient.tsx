import React, { FC } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';

import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientDetails } from "../../services/actions/ingredients";
// import { getIngredientDetails } from '../../services/actions/ingredients';

import { useDrag } from 'react-dnd';
import { TIngredient } from "../../services/types/data";

interface IIngredient {
    ingredient: TIngredient
}

const Ingredient: FC<IIngredient> = ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { name, image, price, _id, type } = ingredient;
    const { constructorIngredients, topBun } = useSelector(state => state.constructorStore);
    
    const [{isDragging}, dragRef] = useDrag({
        type:'ingredient',
        item: {type, name, image, price, _id}, 
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })
    const opacity = isDragging ? 0.5 : 1;
    const countIt = constructorIngredients.reduce((acc,item) => {
        if (topBun && topBun._id === _id){
            return 2;
        } else
            return item._id === _id ? acc+1 : acc
    }, 0);

    const onCardClickHandler = () => {
        dispatch(setIngredientDetails(ingredient))
    };

    // const onCloseClickHandler = () => {
    //     setIsOpenDetails(false);
    // }

    return (
            <div ref={dragRef} className={styles.ingredientCard} onClick={onCardClickHandler} style={{opacity}} data-test-id='burger-ingredient'>
                <Link  className={styles.link} 
                    to={{ 
                        pathname: `/ingredients/${_id}`, 
                        state: {background: location} 
                    }}
                >
                    <img className={styles.image} src={image} alt={name} /> 
                    <div className={styles.price}>
                        <p className="text text_type_digits-default pr-2"> {price} </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div>
                        <p className={`${styles.name} text text_type_main-default`}>
                            {name}
                        </p>
                    </div>
                    {countIt > 0 && <Counter count={countIt} size="default" />}
                </Link>
            </div>
    )
}


export default Ingredient;