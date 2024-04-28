import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

type Filter = {
    startTime: Date,
    endTime: Date,
    region: string,
    searchPattern: string,
    priceSort: boolean,
}

const initialState: Filter = {
    startTime: new Date(),
    endTime: new Date(),
    region: '',
    searchPattern: '',
    priceSort: true,
};

initialState.startTime.setHours(0);
initialState.startTime.setMinutes(0);
initialState.startTime.setSeconds(0);
initialState.startTime.setMilliseconds(0);

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
        },
        setSearchPattern: (state, action: PayloadAction<string>) => {
            state.searchPattern = action.payload;
        },
        setPriceSort: (state, action: PayloadAction<boolean>) => {
            state.priceSort = action.payload;
        }
    }
})

export const {
    setStartTime,
    setEndTime,
    setRegion,
    setSearchPattern,
    setPriceSort,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

export type RootState = {
    [filterSlice.name]: Filter;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof filterSlice.actions>
>();
