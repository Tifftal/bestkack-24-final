import { RootState } from "./NavigationSlice";

export const selectNavigationState = (state: RootState) => {
    return state.navigation;
};
