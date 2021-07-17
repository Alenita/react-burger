import React, { useEffect, useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientsType from '../ingredients-type/ingredients-type';
import Tabs from '../tabs/tabs';
import { getIngredients } from '../../services/actions/ingredients';

import { useSelector, useDispatch } from 'react-redux';

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState("bun");
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.ingredients);
    useEffect(()=> {
        dispatch(getIngredients());
    }, [dispatch])

    const bunRef = useRef();
    const sauceRef = useRef();
    const stuffingRef = useRef();
    const refs = {
        'bun': bunRef,
        'sauce': sauceRef,
        'stuffing': stuffingRef
    };
    const scrollRef = useRef(null);

    const filteredIngredients = (ingredientType) => {
        return ingredients.filter(item => item.type === ingredientType)
    };

    const handleClick = (data) => {
        const currentRef = refs[data];
        currentRef.current.scrollIntoView({
            behavior: "smooth",
        })
        setCurrentTab(data)
    };

    const handleScroll = () => {
        const scrollContainerPosition = scrollRef.current.getBoundingClientRect().top;
        const bunHeaderPosition = bunRef.current.getBoundingClientRect().top;
        const sauceHeaderPosition = sauceRef.current.getBoundingClientRect().top;
        const stuffingHeaderPosition = stuffingRef.current.getBoundingClientRect().top;
    // console.log("scroll container pos: ", scrollContainerPosition);
    // console.log("first header pos: ", firstHeaderPosition);
    // console.log("second header pos: ", secondHeaderPosition);
        const firstDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const secondDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const thirdDiff = Math.abs(scrollContainerPosition - stuffingHeaderPosition);

        if (firstDiff < secondDiff) {
            setCurrentTab("buns");
        } else if (secondDiff < thirdDiff) {
            setCurrentTab("sauce");
        } else setCurrentTab("stuffing");
    // Используем Math.abs, так как число может получиться отрицательное
    }

    return (
            <section className={styles.section}>
                <h1 className={`text text_type_main-large`}>
                    Соберите бургер
                </h1>
                <Tabs onTabClick={handleClick} current={currentTab} />
                <ul ref={scrollRef}
                    className={styles.ingredientList} 
                    onScroll={handleScroll}>
                    <li className={styles.item}
                        ref={bunRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("bun")} 
                            typeName={"Булки"} />
                    </li>
                    <li className={styles.item}
                        ref={sauceRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("sauce")} 
                            typeName={"Соусы"} />
                    </li>
                    <li className={styles.item}
                        ref={stuffingRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("main")} 
                            typeName={"Начинки"} />
                    </li>
                </ul>
            </section>
        )
    }

export default BurgerIngredients;