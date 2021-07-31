import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from "./burger-constructor.module.css";

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import ConstructorFooter from "../constructor-footer/constructor-footer";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientToConstructor } from '../../services/actions/constructor-action';
import { deleteIngredient } from "../../services/actions/constructor-action";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorIngredients, bun } = useSelector(state => state.constructorStore);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
                dispatch(addIngredientToConstructor(item.type, item.name, item.image, item.price, item._id))
            },
    });

    const ingredientPosition = (position) => {
        return position === "top" ? "(верх)" : "(низ)"
    }

    const deleteHandler = (id) => {
        dispatch(deleteIngredient(id))
    };

    const mainIngredients = constructorIngredients.filter(item=> item.type !== 'bun');
    return (
        <section className={styles.container}>
            <div className={styles.orders} ref={dropTarget}>
                <div className={`pl-8`}>
                    { bun && <ConstructorElement
                        className={styles.element}
                        type="top"
                        isLocked={true}
                        text={bun.name + ingredientPosition("top")}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <div className={styles.mainIngredientsList}>
                    {mainIngredients && mainIngredients.map ((item, index) => 
                        <BurgerConstructorItem
                            key={item.uniqueId} 
                            uniqueId={item.uniqueId}
                            _id={item._id}
                            index={index}
                            type={item.type}
                            price={item.price}
                            name={item.name}
                            image={item.image}
                            deleteItem={deleteHandler}
                        />
                    )}
                </div>
                <div className={`pl-8`}>
                    {bun && <ConstructorElement
                        className={styles.element}
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ingredientPosition("bottom")}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
                </div>
                <ConstructorFooter />
            </div> 
        </section>
    )
};

export default BurgerConstructor;
