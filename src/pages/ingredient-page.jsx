import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIngredientDetails } from '../services/actions/ingredients'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'

export const IngredientPage = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const { ingredients, ingredientDetails } = useSelector(state => state.ingredients)

    let currentIngredient = ingredients.find((item) => item._id === id);

    useEffect(() => {
        dispatch(setIngredientDetails(currentIngredient));
    }, [dispatch, currentIngredient])

    return (
            <>
                {ingredientDetails ? 
                (
                    <>
                    <h2 className="text text_type_main-large mt-20">Детали Ингредиента</h2>
                    <IngredientDetails />
                    </>    
                ) : 
                <p className="text text_type_main-medium text_color_inactive">У нас сейчас нет такого ингредиента.</p>}
            </>)
}