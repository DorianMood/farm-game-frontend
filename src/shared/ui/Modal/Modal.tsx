import {
    ReactNode,
} from "react";
import {ModalContent} from "./ModalContent.tsx";

interface ModalProps {
    className?: string;
    disableScroll?: boolean;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
    const {className, children, isOpen,disableScroll,  onClose} = props;

    if (!isOpen) {
        return null
    }

    return <ModalContent onClose={onClose} className={className} children={children} disableScroll={disableScroll}/>
};
