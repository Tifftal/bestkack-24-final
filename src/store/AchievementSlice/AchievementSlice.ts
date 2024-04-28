import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from '../createReduxHookFactory';
import { SliceActions } from '../sliceActions';

export type AchievementType = {
  image: string;
  status: string;
};

const initialState: AchievementType = {
  image: '',
  status: '',
};

export const achievementSlice = createSlice({
  name: 'achievement',
  initialState,
  reducers: {
    setAchievement: (state, action: PayloadAction<AchievementType>) => {
      state.image = action.payload.image;
      state.status = action.payload.status;
    },
    setAchievementStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setAchievementImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

export const { setAchievement, setAchievementStatus, setAchievementImage } = achievementSlice.actions;

export const achievementReducer = achievementSlice.reducer;

export type RootState = {
  [achievementSlice.name]: AchievementType;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  SliceActions<typeof achievementSlice.actions>
>();
