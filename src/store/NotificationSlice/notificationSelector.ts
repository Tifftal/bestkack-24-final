import { RootState } from "./NotificationSlice";

export const selectNotificationState = (state: RootState) => state.notification;

export const selectNotifications = (state: RootState) => selectNotificationState(state).notifications;
