import {useEffect, useState} from "react";
import {Notification} from "../../../ui/Notification/Notification";

const ANIMATION_DELAY = 5000;

export const useNotification = (text: string) => {
    const [isOpenedNotification, setOpenedNotification] = useState(true);

    const openNotification = () => {
        setOpenedNotification(true);
    };

    useEffect(() => {
        let timerId: number;

        if (isOpenedNotification) {
            timerId = setTimeout(() => {
                setOpenedNotification(false);
            }, ANIMATION_DELAY)
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        }
    }, [isOpenedNotification]);


    return {
        openNotification,
        notificationComponent: <Notification text={text} isOpen={isOpenedNotification}/>
    }
};
