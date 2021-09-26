import React from "react";
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrop } from 'react-dnd';
import styles from "./burger-constructor.module.css";

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import ConstructorFooter from "../constructor-footer/constructor-footer";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientToConstructor } from '../../services/actions/constructor-action';
import { deleteIngredient } from "../../services/actions/constructor-action";
import { TIngredient } from "../../services/types/data";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorIngredients, topBun, bottomBun } = useSelector(state => state.constructorStore);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: TIngredient) {
                dispatch(addIngredientToConstructor(item.type, item.name, item.image, item.price, item._id))
            },
    });

    const deleteHandler = (id: string) => {
        dispatch(deleteIngredient(id))
    };

    const mainIngredients = constructorIngredients.filter((item) => item.ingredientType !== 'bun');
    return (
        <section className={styles.container}>
            <div className={styles.orders} ref={dropTarget} data-test-id='burger-constructor'>
                <div className={`${styles.element} pl-8`}
                    data-test-id='burger-constructor-bun'
                >
                    { topBun && <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={topBun.name + ' (верх)'}
                        price={topBun.price}
                        thumbnail={topBun.image}
                    />}
                </div>
                <div className={styles.mainIngredientsList}  data-test-id='burger-constructor-main'>
                    {mainIngredients && mainIngredients.map ((item, index) => 
                        <BurgerConstructorItem
                            key={item.uniqueId} 
                            uniqueId={item.uniqueId}
                            _id={item._id}
                            index={index}
                            // type={item.type}
                            price={item.price}
                            name={item.name}
                            image={item.image}
                            deleteItem={deleteHandler}
                        />
                    )}
                </div>
                <div className={`${styles.element} pl-8`}
                    data-test-id='burger-constructor-bun'
                >
                    {bottomBun && <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bottomBun.name + ' (низ)'}
                        price={bottomBun.price}
                        thumbnail={bottomBun.image}
                    />}
                </div>
                <ConstructorFooter />
            </div> 
        </section>
    )
};

export default BurgerConstructor;
