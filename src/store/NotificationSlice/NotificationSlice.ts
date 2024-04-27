import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";
import { NotificationType } from "./types";

export type NotificationState = {
    notifications: NotificationType[];
}

const initialState: NotificationState = {
    notifications: [],
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationType>) => {
            state.notifications.unshift(action.payload);
        },
        closeNotification: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.map((notification : NotificationType, idx: number) => {
                if (idx === action.payload) {
                    return {
                        ...notification,
                        isOpen: false,
                    }
                }

                return notification;
            })
        }
    }
})

export const {
    addNotification,
    closeNotification,
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

export type RootState = {
    [notificationSlice.name]: NotificationState;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof notificationSlice.actions>
>();
