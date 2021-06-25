import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import IngredientsType from "../ingredients-type/ingredients-type";
import Tabs from "../tabs/tabs";

const BurgerIngredients = ({ingredientsDetails}) => {
    
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();
    const refs = {
        'bun': bunRef,
        'sauce': sauceRef,
        'stuffing': mainRef
    };

    const filteredIngredients = (ingredientType) => {
        return ingredientsDetails.filter(item => item.type === ingredientType)
    };

    const handleScroll = (data) => {
        const currentRef = refs[data];
        currentRef.current.scrollIntoView({
            behavior: "smooth",
        })
    }

    return (
            <section className={styles.section}>
                <h1 className={`text text_type_main-large`}>
                    Соберите бургер
                </h1>
                <Tabs onTabClick={handleScroll}/>
                <ul className={styles.ingredientList} >
                    <li className={styles.item}
                        ref={bunRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("bun")} 
                            name={"Булки"} />
                    </li>
                    <li className={styles.item}
                        ref={sauceRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("sauce")} 
                            name={"Соусы"} />
                    </li>
                    <li className={styles.item}
                        ref={mainRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("main")} 
                            name={"Начинки"} />
                    </li>
                </ul>
            </section>
        )
    }

BurgerIngredients.propTypes = PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
}))

export default BurgerIngredients;