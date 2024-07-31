import {useEffect, useState} from "react";
import {Notification} from "../../../ui/Notification/Notification";

const ANIMATION_DELAY = 3000;

export const useNotification = (text: string) => {
    const [isOpenedNotification, setOpenedNotification] = useState(false);

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
