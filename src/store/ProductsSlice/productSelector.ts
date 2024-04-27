import { RootState } from "./ProductsSlice";

export const selectProductState = (state: RootState) => state.product;

export const selectProducts = (state: RootState) => selectProductState(state).products;
