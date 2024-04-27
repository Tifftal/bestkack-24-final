import { RootState } from "./NotificationSlice";

export const selectNotificationState = (state: RootState) => {
    return state.notification;
};
