import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from "@reduxjs/toolkit";
import { createReduxHookFactory } from '../createReduxHookFactory';
import { SliceActions } from '../sliceActions';
import { ProductType } from "./types";

export type ProductsState = {
    products: ProductType[]
};

const initialState: ProductsState = {
    products: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        }
    }
});

export const {
    setProducts,
} = productSlice.actions;

export const productReducer = productSlice.reducer;

export type RootState = {
    [productSlice.name]: ProductsState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof productSlice.actions>
>();
