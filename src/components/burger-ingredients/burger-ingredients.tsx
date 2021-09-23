import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';

import styles from './burger-ingredients.module.css';
import IngredientsType from '../ingredients-type/ingredients-type';
import Tabs from '../tabs/tabs';
import { getIngredients } from '../../services/actions/ingredients';

type TIngredientType =
  | 'bun'
  | 'main'
  | 'sauce';

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = useState("bun");
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.ingredients);
    
    useEffect(()=> {
        dispatch(getIngredients());
    }, [dispatch])

    const bunRef = useRef<HTMLDivElement>(null);
    const sauceRef = useRef<HTMLDivElement>(null);
    const stuffingRef = useRef<HTMLDivElement>(null);
    const refs = useRef<{ [K in TIngredientType]: React.RefObject<HTMLDivElement> }>({
        'bun': bunRef,
        'main': stuffingRef,
        'sauce': sauceRef,
    });
    const scrollRef = useRef<HTMLDivElement>(null);

    const filteredIngredients = (ingredientType: TIngredientType) => {
        return ingredients.filter(item => item.type === ingredientType)
    };

    const handleScrollToType = (curRef: React.RefObject<HTMLDivElement>) => {
        curRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const handleClick = (data: TIngredientType) => {
        const currentRef = refs.current[data];
        console.log('ref = ' + currentRef)
        handleScrollToType(currentRef)
        setCurrentTab(data)
    };

    const handleScroll = () => {
        const scrollContainerPosition = scrollRef.current!.getBoundingClientRect().top;
        const bunHeaderPosition = bunRef.current!.getBoundingClientRect().top;
        const sauceHeaderPosition = sauceRef.current!.getBoundingClientRect().top;
        const stuffingHeaderPosition = stuffingRef.current!.getBoundingClientRect().top;
        const firstDiff = Math.abs(scrollContainerPosition - bunHeaderPosition);
        const secondDiff = Math.abs(scrollContainerPosition - sauceHeaderPosition);
        const thirdDiff = Math.abs(scrollContainerPosition - stuffingHeaderPosition);

        if (firstDiff < secondDiff) {
            setCurrentTab("bun");
        } else if (secondDiff < thirdDiff) {
            setCurrentTab("sauce");
        } else setCurrentTab("main");
    }

    return (
            <section className={styles.section}>
                <h1 className={`text text_type_main-large`}>
                    Соберите бургер
                </h1>
                <Tabs onTabClick={handleClick} current={currentTab} />
                <div ref={scrollRef}
                    className={styles.ingredientList} 
                    onScroll={handleScroll}>
                    <div className={styles.item}
                        ref={bunRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("bun")} 
                            typeName={"Булки"} />
                    </div>
                    <div className={styles.item}
                        ref={sauceRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("sauce")} 
                            typeName={"Соусы"} />
                    </div>
                    <div className={styles.item}
                        ref={stuffingRef}>
                        <IngredientsType 
                            ingredients={filteredIngredients("main")} 
                            typeName={"Начинки"} />
                    </div>
                </div>
            </section>
        )
    }

export default BurgerIngredients;