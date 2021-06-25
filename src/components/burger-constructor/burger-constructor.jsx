import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import ConstructorFooter from "../constructor-footer/constructor-footer";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = (props) => {
    const { orderDetails } = props;
    const bun = orderDetails.filter(item => item.type === 'bun')[0];
    const mainIngredients = orderDetails.filter(item => item.type !== 'bun');
    console.log(bun)
    return (
        <section className={styles.container}>
            <div className={styles.orders}>
                <div className={`pl-8`}>
                    <ConstructorElement
                        className={styles.element}
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
                <div className={styles.mainIngredientsList}>
                    {mainIngredients.map ((item,index) => 
                        <div className={styles.elementWithDragIcon}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                key={index}
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
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
                <ConstructorFooter />
            </div>
            
        </section>
    )
};

BurgerConstructor.propTypes = PropTypes.arrayOf(PropTypes.shape({
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


export default BurgerConstructor;
