import {useEffect} from "react";
import CloseIcon from "shared/assets/icons/close-44-44.svg?react";
import {Modal} from "shared/ui/Modal/Modal";
import cls from "./CustomGameModal.module.scss";

interface Props {
    onClose: (isSuccess: boolean) => void;
    opened: boolean;
    url: string;
}

export const CustomGameModal = ({onClose, opened, url}: Props) => {
    useEffect(() => {
        const handleMessageEvent = (event: MessageEvent) => {
            if (event.origin !== url) return;

            if (event.data === 'success') {
                onClose(true)
            }
        };

        window.addEventListener(
            "message",
            handleMessageEvent
        );

        return () => window.removeEventListener("message", handleMessageEvent)
    }, []);

    return (
        <Modal isOpen={opened} className={cls.modal}>
            <div className={cls.root}>
                <CloseIcon className={cls["close-icon"]} onClick={() => {onClose(false)}}/>
                <iframe className={cls.game} src={url} frameBorder="0"/>
            </div>
        </Modal>
    )
};
