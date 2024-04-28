import { Notification, rem } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeNotification } from "store/NotificationSlice/NotificationSlice";
import { selectNotifications } from "store/NotificationSlice/notificationSelector";
import { Props } from "./types";

import styles from "./styles.module.scss";

const NotificationWrapper: React.FC<Props> = ({ children }) => {
    const notifications = useSelector(selectNotifications);
    const dispatch = useDispatch();

    const handleCloseMessage = (idx: number) => {
        dispatch(closeNotification(idx));
    }

    const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
    const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

    useEffect(() => {
        const tiemoutIds: NodeJS.Timeout[] = [];

        notifications.forEach((notifications, idx) => {
            if (notifications.isOpen) {
                tiemoutIds.push(setTimeout(() => {
                    handleCloseMessage(idx);
                }, 3000))
            }
        });

        return () => {
            tiemoutIds.forEach(id => clearTimeout(id));
        }
    }, [notifications]);

    return (
        <>
            <div className={styles['notification-wrapper']}>
                {notifications.map((notification, idx: number) =>
                    notification.isOpen && (
                        <div
                            className={styles.notification}
                            key={idx}
                        >
                            <Notification
                                icon={notification.title === 'Успешно' ? checkIcon : xIcon}
                                color={notification.title === 'Успешно' ? 'teal' : 'red'}
                                onClose={() => handleCloseMessage(idx)}
                                title={notification.title || ''}
                            >
                                {notification.description || ''}
                                <div className={styles['notifications-progress-bar']}>
                                    <div className={styles["notifications-progress"]} />
                                </div>
                            </Notification>
                        </div>
                    ))}
            </div>
            {children}
        </>
    )
}

export default NotificationWrapper;