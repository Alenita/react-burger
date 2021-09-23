import * as ActionTypes from '../constants';
import { constructorReducer } from './constructor-reducer';

describe('Constructor-reducer', () => {
    it('Должен вернуть начальное состояние', () => {
        expect(constructorReducer(undefined, {})).toEqual({
            constructorIngredients: [],
            topBun: null,
            bottomBun: null,
        })
    });

    it ('Должен добавить дополнительный соус в массив ингредиентов ингредиенты', () => {
        expect(constructorReducer({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                }
            ],
            topBun: null,
            bottomBun: null,
        },
        {
            type: ActionTypes.ADD_INGREDIENT_TO_CONSTRUCTOR,
            ingredientType: 'sauce', 
            name: 'Соус с шипами Антарианского плоскоходца', 
            image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
            price: 88,
            _id: "60666c42cc7b410027a1a9ba", 
        }
        )).toEqual({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                },
                {
                    ingredientType: 'sauce', 
                    name: 'Соус с шипами Антарианского плоскоходца', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 88,
                    _id: "60666c42cc7b410027a1a9ba",
                    uniqueId: expect.any(String)
                }
            ],
            topBun: null,
            bottomBun: null,
        })
    });

    it('Должен заменить булки сверху и снизу на новую', () => {
        expect(constructorReducer({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                }
            ],
            topBun: {
                ingredientType: "bun",
                name: "Флюоресцентная булка R2-D3",
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                price: 7543, 
                _id: "60666c42cc7b410027a1a9b2", 
                uniqueId: '5832f89r'
            },
            bottomBun: {
                ingredientType: "bun",
                name: "Флюоресцентная булка R2-D3",
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                price: 7543, 
                _id: "60666c42cc7b410027a1a9b2", 
                uniqueId: "5832f89r"
            }},
            {
                type: ActionTypes.ADD_INGREDIENT_TO_CONSTRUCTOR,
                ingredientType: "bun",
                name: "Краторная булка N-200i",
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                price: 893, 
                _id: "60666c42cc7b410027a1a9b1", 
            }
        ))
        .toEqual({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                }
            ],
            topBun: {
                ingredientType: "bun",
                name: "Краторная булка N-200i",
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                price: 893, 
                _id: "60666c42cc7b410027a1a9b1",
                uniqueId: expect.any(String)
            },
            bottomBun: {
                ingredientType: "bun",
                name: "Краторная булка N-200i",
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                price: 893, 
                _id: "60666c42cc7b410027a1a9b1", 
                uniqueId: expect.any(String)
            },
        })
    });

    it('Должен удалить ингредиент, у которого id совпадает с полученным', () => {
        expect(constructorReducer({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                },
                {
                    ingredientType: 'sauce', 
                    name: 'Соус с шипами Антарианского плоскоходца', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 88,
                    _id: "60666c42cc7b410027a1a9ba",
                    uniqueId: '3568o'
                }
            ],
            topBun: null,
            bottomBun: null,
        },
        {
            type: ActionTypes.DELETE_FROM_CONSTRUCTOR,
            uniqueId: '3568o'
        }
        )).toEqual({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                }
            ],
            topBun: null,
            bottomBun: null,
        })
    });

    it('Должен переместить игредиент в соответствии с новым пришедшим индексом', () => {
        expect(constructorReducer({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 1', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12345'
                },
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 2', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '54321'
                },
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 3', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '98765'
                }
            ],
            topBun: null,
            bottomBun: null
        },
        {
            type: ActionTypes.CHANGE_INGREDIENTS_ORDER,
            dragIndex: 1,
            hoverIndex: 3
        }
        )).toEqual({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 1', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12345'
                },
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 3', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '98765'
                },
                {
                    ingredientType: 'main', 
                    name: 'Ингредиент 2', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '54321'
                }
            ],
            topBun: null,
            bottomBun: null
        })
    });

    it('Должен возвращать конструктор в начальное состояние', () => {
        expect(constructorReducer({
            constructorIngredients: [
                {
                    ingredientType: 'main', 
                    name: 'Кристаллы марсианских альфа-сахаридов', 
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png", 
                    price: 762, 
                    _id: "60666c42cc7b410027a1a9bd", 
                    uniqueId: '12347'
                }
            ],
            topBun: {
                ingredientType: "bun",
                name: "Флюоресцентная булка R2-D3",
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                price: 7543, 
                _id: "60666c42cc7b410027a1a9b2", 
                uniqueId: '5832f89r'
            },
            bottomBun: {
                ingredientType: "bun",
                name: "Флюоресцентная булка R2-D3",
                image: "https://code.s3.yandex.net/react/code/bun-01.png",
                price: 7543, 
                _id: "60666c42cc7b410027a1a9b2", 
                uniqueId: "5832f89r"
            }
        },
        {
            type: ActionTypes.RESET_CONSTRUCTOR
        }
        )).toEqual({
            constructorIngredients: [],
            topBun: null,
            bottomBun: null,
        })
    });
})