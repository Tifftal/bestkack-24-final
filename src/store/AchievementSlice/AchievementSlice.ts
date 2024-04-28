import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from '../createReduxHookFactory';
import { SliceActions } from '../sliceActions';

export type AchievementType = {
  id: number,
  name: string;
  value: number;
  icon: string;
};

const initialState: AchievementType = {
  id: 0,
  name: '',
  value: 0,
  icon: '',
};

export const achievementSlice = createSlice({
  name: 'achievement',
  initialState,
  reducers: {
    setAchievement: (state, action: PayloadAction<AchievementType>) => {
      state.icon = action.payload.icon;
      state.name = action.payload.name;
      state.value = action.payload.value;
    }
  },
});

export const { setAchievement } = achievementSlice.actions;

export const achievementReducer = achievementSlice.reducer;

export type RootState = {
  [achievementSlice.name]: AchievementType;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
  RootState,
  SliceActions<typeof achievementSlice.actions>
>();
