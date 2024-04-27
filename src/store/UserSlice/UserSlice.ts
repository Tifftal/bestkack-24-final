import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";
import { ProductType } from "./../ProductsSlice/types";

export type JwtTokens = {
    access: string;
    refresh: string;
}

export type CartType = {
    id: string;
    name: string;
    price: number;
    description: string;
    amount: number;
}

export type UserType = {
    id: string;
    name: string;
    surname: string;
    middleName: string;
    roles: string[];
    username: string;
    phone: string,
    jwtTokens: JwtTokens;
    products: CartType[];
}

export type UserState = UserType;

const initialState: UserState = {
    id: '',
    username: '',
    roles: [],
    middleName: '',
    surname: '',
    name: '',
    phone: '',
    jwtTokens: {
        access: '',
        refresh: '',
    },
    products: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserType>) => {
            Object.assign(state, action.payload);
        },
        addProductToCart: (state, action: PayloadAction<CartType>) => {
            const { products } = state;

            console.log(action.payload);

            const existingProductIndex = products.findIndex(({ id }) => id === action.payload.id);

            if (existingProductIndex !== -1) {
                const existingProduct = products[existingProductIndex];

                existingProduct.amount += 1;
            } else {
                products.push({...action.payload, amount: 1});
            }
        },
        removeProductFromCart: (state, action: PayloadAction<string>) => {
            const { products } = state;

            const existingProductIndex = products.findIndex(({ id }) => id === action.payload);

            if (existingProductIndex !== -1) {
                const existingProduct = products[existingProductIndex];

                existingProduct.amount -= 1;

                if (existingProduct.amount === 0) {
                    products.splice(existingProductIndex, 1);
                }        
            }
        }
    }
})

export const {
    setUser,
    addProductToCart,
    removeProductFromCart,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
    [userSlice.name]: UserState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof userSlice.actions>
>();
