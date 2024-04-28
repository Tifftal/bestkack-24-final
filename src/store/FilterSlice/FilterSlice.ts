import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

type Filter = {
    startTime: Date,
    endTime: Date,
    region: string
}

const initialState: Filter = {
    startTime: new Date(),
    endTime: new Date(),
    region: ''
};

initialState.startTime.setDate(initialState.startTime.getDate() - 1);

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setStartTime: (state, action: PayloadAction<Date>) => {
            state.startTime = action.payload;
        },
        setEndTime: (state, action: PayloadAction<Date>) => {
            state.endTime = action.payload;
        },
        setRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload;
        }
    }
})

export const {
    setStartTime,
    setEndTime,
    setRegion
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export type RootState = {
    [filterSlice.name]: Filter;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof filterSlice.actions>
>();
