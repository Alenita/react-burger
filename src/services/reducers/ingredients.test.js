import * as types from '../actions/ingredients';
import { ingredientsReducer } from './ingredients';

describe('ingredientsReducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsError: false,
            ingredientDetails: null,
        })
    });

    it('Должен возвращать информацию о загрузке в начале запроса',() => {
        expect (ingredientsReducer({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsError: false,
            ingredientDetails: null,
        },{
            type: types.GET_INGREDIENTS_REQUEST,
            ingredientsRequest: true
        })).toEqual({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsError: false,
            ingredientDetails: null,
        })
    });

    it('После загрузки должен добавлять приходящие игредиенты в массив', () => {
        expect(ingredientsReducer({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsError: false,
            ingredientDetails: null,
        },{
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [{
                "_id":"60666c42cc7b410027a1a9b1",
                "name":"Краторная булка N-200i",
            },
            {
                "_id":"60666c42cc7b410027a1a9b5",
                "name":"Говяжий метеорит (отбивная)",
            },
            {
                "_id":"60666c42cc7b410027a1a9b6",
                "name":"Биокотлета из марсианской Магнолии",
            }]
        }
        )).toEqual({
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b6",
                    "name":"Биокотлета из марсианской Магнолии",
                }
            ],
            ingredientsRequest: false,
            ingredientsError: false,
            ingredientDetails: null,
        })
    });
    it('Должен показывать, что возникла ошибка при запросе', () => {
        expect(ingredientsReducer({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsError: false,
            ingredientDetails: null,
        },
        {
            type: types.GET_INGREDIENTS_ERROR,
            ingredientsError: true
        })).toEqual({
            ingredients: [],
            ingredientsRequest: false,
            ingredientsError: true,
            ingredientDetails: null,
        })
    });
    it('Должен добавлять детальную информацию об ингредиенте', () => {
        expect(ingredientsReducer({
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b6",
                    "name":"Биокотлета из марсианской Магнолии",
                }
            ],
            ingredientsRequest: false,
            ingredientsError: false,
            ingredientDetails: null,
        },
        {
            type: types.SET_INGREDIENT_DETAILS,
            ingredient: {
                "_id":"60666c42cc7b410027a1a9b6",
                "name":"Биокотлета из марсианской Магнолии",
                "type":"main",
                "proteins":420,
                "fat":142,
                "carbohydrates":242,
                "calories":4242,
                "price":424,
                "image":"https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v":0
            }
        })).toEqual({
            ingredients: [
                {
                    "_id":"60666c42cc7b410027a1a9b1",
                    "name":"Краторная булка N-200i",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b5",
                    "name":"Говяжий метеорит (отбивная)",
                },
                {
                    "_id":"60666c42cc7b410027a1a9b6",
                    "name":"Биокотлета из марсианской Магнолии",
                }
            ],
            ingredientsRequest: false,
            ingredientsError: false,
            ingredientDetails: {
                "_id":"60666c42cc7b410027a1a9b6",
                "name":"Биокотлета из марсианской Магнолии",
                "type":"main",
                "proteins":420,
                "fat":142,
                "carbohydrates":242,
                "calories":4242,
                "price":424,
                "image":"https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v":0
            },
        })
    })
})