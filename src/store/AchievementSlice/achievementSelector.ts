import { RootState } from "./AchievementSlice";

export const selectAchievementState = (state: RootState) => {
    return state.achievement;
};
