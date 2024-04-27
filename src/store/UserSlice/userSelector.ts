import { RootState } from "./UserSlice";

export const selectUserState = (state: RootState) => {
    return state.user;
};
