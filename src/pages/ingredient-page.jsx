import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients, setIngredientDetails } from '../services/actions/ingredients'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../components/ingredient-details/ingredient-details'

export const IngredientPage = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const { ingredients, ingredientDetails } = useSelector(state => state.ingredients)

    // useEffect(() => {
    //     dispatch(getIngredients())
    // }, [dispatch])

    let currentIngredient = ingredients.find((item) => item._id === id);

    useEffect(() => {
        dispatch(setIngredientDetails(currentIngredient));
    }, [dispatch, currentIngredient])

    return (
            <>
                {ingredientDetails ? 
                <IngredientDetails /> : 
                <p className="text text_type_main-medium text_color_inactive">У нас сейчас нет такого ингредиента.</p>}
            </>)
}