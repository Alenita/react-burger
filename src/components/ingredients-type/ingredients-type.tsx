import React, { FC } from "react";
import styles from "./ingredients-type.module.css";
import Ingredient from "../ingredient/ingredient";
import { TIngredient } from "../../services/types/data";

interface IIngredientsOfType {
    ingredients: TIngredient [],
    typeName: string
};

const IngredientsType: FC<IIngredientsOfType> = ({ingredients, typeName}) => {
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">
                {typeName}
            </p>
            <ul className={styles.list}>
                {ingredients.map((item) => 
                    <li 
                        key={item._id}
                        className={styles.ingredientItem}>
                        <Ingredient 
                            ingredient={item}
                        />
                    </li>
                )}
            </ul>
        </div>
    )
};

export default IngredientsType;