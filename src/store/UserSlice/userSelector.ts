import { RootState } from "./UserSlice";

export const selectUserState = (state: RootState) => {
    return state.user;
};

export const selectIsUserAdmin = (state: RootState) => selectUserState(state).roles.includes("ROLE_ADMIN");

export const selectUserCart = (state: RootState) => selectUserState(state).products;

export const selectUsersRegion = (state: RootState) => selectUserState(state).region;
