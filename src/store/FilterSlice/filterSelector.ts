import { RootState } from "./FilterSlice";

export const selectFilterState = (state: RootState) => {
    return state.filter;
};

export const selectShopFilters = (state: RootState) => {
    return {
        searchPattern: selectFilterState(state).searchPattern,
        priceSort: selectFilterState(state).priceSort,
    };
};
