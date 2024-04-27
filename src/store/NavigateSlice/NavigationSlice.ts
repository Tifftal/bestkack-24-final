import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

const initialState: string = 'main';

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setChosenLink: (state, action: PayloadAction<string>) => {
            state = action.payload;
            return state
        }
    }
})

export const {
    setChosenLink,
} = navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;

export type RootState = {
    [navigationSlice.name]: string;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof navigationSlice.actions>
>();
