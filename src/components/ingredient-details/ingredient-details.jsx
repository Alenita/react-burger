import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const { ingredientDetails } = useSelector(state => state.ingredients)
    
    const EnergyValues = () => {
        return (
            <div className={styles.values}>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.calories}
                    </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {ingredientDetails.proteins}
                        </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.fat}
                    </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {ingredientDetails.carbohydrates}
                    </span>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <img  className={`${styles.image} mb-4`} 
                src={ingredientDetails.image} 
                alt={ingredientDetails.name}/>
            <h3 className="text text_type_main-medium mb-4">{ingredientDetails.name}</h3>
            <EnergyValues />
        </div>
    )
};

export default IngredientDetails;