import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

const initialState: boolean = false;

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<boolean>) => {
            state = action.payload;
            return state
        }
    }
})

export const {
    showNotification,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export type RootState = {
    [notificationSlice.name]: string;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof notificationSlice.actions>
>();
