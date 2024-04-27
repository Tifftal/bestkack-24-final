import { RootState } from "./UserSlice";

export const selectUserState = (state: RootState) => {
    return state.user;
};

export const selectUserCart = (state: RootState) => selectUserState(state).products;
