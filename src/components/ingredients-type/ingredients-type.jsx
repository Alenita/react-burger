import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-type.module.css";
import Ingredient from "../ingredient/ingredient";

const IngredientsType = (props) => {
    const { ingredients, typeName } = props;
    return (
        <div className={styles.container}>
            <p className="text text_type_main-medium mb-6">
                {typeName}
            </p>
            <ul className={styles.list}>
                {ingredients.map((item) => 
                    <li key={item._id}
                        className={styles.ingredientItem}>
                        <Ingredient 
                            className={styles.ingredientItems}
                            ingredient={item}
                        >
                        </Ingredient>
                    </li>
                )}
            </ul>
        </div>
    )
};

IngredientsType.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired),
    typeName: PropTypes.string.isRequired,
}

export default IngredientsType;