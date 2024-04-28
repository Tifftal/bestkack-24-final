import { RootState } from "./FilterSlice";

export const selectFilterState = (state: RootState) => {
    return state.filter;
};
