import React, {useState} from "react";
import PropTypes from "prop-types";
import styles from "./ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Ingredient(props) {
    const { ingredient } = props; 
    // const [ count, setCount ] = useState(0);
    const [ isOpenDetails, setIsOpenDetails ] = useState(false)

    // const countHandler = () => {
    //     setCount(count+1);
    // }

    const onCardClickHandler = () => {
        setIsOpenDetails(true);
    }

    const onCloseClickHandler = () => {
        setIsOpenDetails(false);
    }

    return (
            <div className={styles.ingredientCard} onClick={onCardClickHandler}>
                <img className={styles.image} src={ingredient.image} alt={ingredient.name} /> 
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2"> {ingredient.price} </p>
                    <CurrencyIcon type="primary" />
                </div>
                <div className="">
                    <p className={`${styles.name} text text_type_main-default`}>
                        {ingredient.name}
                    </p>
                </div>
                {isOpenDetails && <IngredientDetails onClose={onCloseClickHandler} details={ingredient}/>}
                {/* {count > 0 ? <Counter count={count} size="default" /> : ""} */}
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