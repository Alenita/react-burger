export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: number;
};

export type TIngredientId = {
    readonly _id: string;
};

export type TOrder = {
    ingredients: string[],
    name: string,
    _id: string,
    status: 'done' | 'pending' | 'created';
    number: number,
    createdAt: string,
    updatedAt: string
}

// export type TOrderDetails = {
//     ingredients: ReadonlyArray<TIngredientId>;
//     _id: string;
//     status: 'done' | 'pending' | 'created';
//     number: number;
//     createdAt: string;
//     updatedAt: string
// };

export type TUser = {
    email: string; 
    name: string;
    password?: string 
} 

export type TAuthorization = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: TUser
}

export type TMessage = {
    wsConnected: boolean,
    orders: TOrder[] | [],
    total: null | number,
    totalToday: null | number,
}