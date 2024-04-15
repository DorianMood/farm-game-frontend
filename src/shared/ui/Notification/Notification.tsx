import classNames from "classnames";
import {Portal} from "shared/ui/Portal/Portal";
import cls from "./Notification.module.scss";
import NotificationIcon from "shared/assets/icons/notification-24-24.svg?react";
import {Text} from "../Text/Text";

interface NotificationProps {
    className?: string;
    text: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Notification = (props: NotificationProps) => {
    const {className, text, isOpen} = props;

    // TODO: Добавить типы уведомлений

    return (
        <Portal>
            <div
                className={classNames(
                    cls.Notification,
                    {
                        [cls.opened]: isOpen,
                    },
                    [className]
                )}
            >
                <Text text={text}/>
                <NotificationIcon />
            </div>
        </Portal>
    );
};
