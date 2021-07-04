import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import ConstructorFooter from "../constructor-footer/constructor-footer";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = (props) => {
    const { orderedIngredients } = props;
    const ingredientPosition = (position) => {
        return position === "top" ? "(верх)" : "(низ)"
    }

    const mainIngredients = orderedIngredients.filter(item => item.type !== 'bun');

    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <div className={`pl-8`}>
                    <ConstructorElement
                        className={styles.element}
                        type="top"
                        isLocked={true}
                        text={`Краторная булка N-200i` + ingredientPosition("top")}
                        price="1255"
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
                <div className={styles.mainIngredientsList}>
                    {mainIngredients.map ((item) => 
                        <div key={item._id} 
                            className={styles.elementWithDragIcon}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </div>
                    )}
                </div>
                <div className={`pl-8`}>
                    <ConstructorElement
                        className={styles.element}
                        type="bottom"
                        isLocked={true}
                        text={`Краторная булка N-200i` + ingredientPosition("bottom")}
                        price="1255"
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                    />
                </div>
                <ConstructorFooter />
            </div> 
        </section>
    )
};

BurgerConstructor.propTypes = {
    orderedIngredients: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired)
};


export default BurgerConstructor;
