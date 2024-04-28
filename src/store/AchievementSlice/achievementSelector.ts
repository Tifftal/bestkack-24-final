import { RootState } from "./AchievementSlice";

export const selectAchievementState = (state: RootState) => {
    return state.achievement;
};

export const selectAchievementStatus = (state: RootState) => selectAchievementState(state).status;
export const selectAchievementImage = (state: RootState) => selectAchievementState(state).image;

