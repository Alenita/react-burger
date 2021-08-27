import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from "./ingredient.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { setIngredientDetails } from "../../services/actions/ingredients";
// import { getIngredientDetails } from '../../services/actions/ingredients';

import { useDrag } from 'react-dnd';
import { useSelector } from "react-redux";

const Ingredient = ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { name, image, price, _id, type } = ingredient;
    const { constructorIngredients, bun } = useSelector(state => state.constructorStore);
    
    const [{isDragging}, dragRef] = useDrag({
        type:'ingredient',
        item: {type, name, image, price, _id}, 
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })
    const opacity = isDragging ? 0.5 : 1;
    const countIt = constructorIngredients.reduce((acc,item) => {
        if (bun && type === 'bun' && bun._id === _id){
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
            <div ref={dragRef} className={styles.ingredientCard} onClick={onCardClickHandler} style={{opacity}}>
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
                    {/* {isOpenDetails && 
                        <Modal onClose={onCloseClickHandler} 
                                header="Детали ингредиента">
                            <IngredientDetails details={ingredient}/>
                        </Modal>} */}
                    {countIt > 0 && <Counter count={countIt} size="default" />}
                </Link>
            </div>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired
    
}; 

export default Ingredient;