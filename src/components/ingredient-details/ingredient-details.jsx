import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import styles from "./ingredient-details.module.css";

const modalRoot = document.getElementById("react-modals");

const IngredientDetails = ({onClose,details}) => {
    const EnergyValues = () => {
        return (
            <div className={styles.values}>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Калории, ккал
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {details.calories}
                    </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <span className="text text_type_digits-default text_color_inactive">
                            {details.proteins}
                        </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {details.fat}
                    </span>
                </div>
                <div className={styles.valueItem}>
                    <p className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </p>
                    <span className="text text_type_digits-default text_color_inactive">
                        {details.carbohydrates}
                    </span>
                </div>
            </div>
        )
    }
    return ReactDOM.createPortal(
        (
            <div id="react-modals">
                <Modal onClose={onClose}
                header="Детали ингредиента"
                >
                    <div className={styles.container}>
                        <img className={`${styles.image} mb-4`} src={details.image_large} alt={details.name}/>
                        <h3 className="text text_type_main-medium mb-4">{details.name}</h3>
                        <EnergyValues />
                    </div>
                </Modal>
            </div>
        ),modalRoot
    )
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number,
    }).isRequired),
    onClose: PropTypes.func.isRequired
}

export default IngredientDetails;