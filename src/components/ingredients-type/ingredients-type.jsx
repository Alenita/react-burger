import React from "react";
import styles from "./ingredients-type.module.css";
import Ingredient from "../ingredient/ingredient";

const IngredientsType = (props) => {
    const { ingredients, name } = props;
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">
                {name}
            </p>
            <ul className={styles.list}>
                {ingredients.map((item, index) => 
                    <li className={styles.ingredientItem}>
                        <Ingredient 
                            className={styles.ingredientItems}
                            key={index}
                            ingredient={item}>
                        </Ingredient>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default IngredientsType;