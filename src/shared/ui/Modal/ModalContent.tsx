import classNames from "classnames";
import React, {
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect, useLayoutEffect,
    useRef,
    useState,
} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import {useTheme} from "app/providers/ThemeProvider";
import cls from "./Modal.module.scss";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const ModalContent = (props: ModalProps) => {
    const {className, children, onClose} = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const {theme} = useTheme();

    useLayoutEffect(() => {
        //let pos = window.scrollY;
        //let posX = window.scrollX;
        //document.body.style.top = -pos + 'px';
        //document.body.style.left = -posX + 'px';

        document.body.style.position = 'fixed';
        return () => {
            document.body.removeAttribute('style')
            //window.scroll({top: pos, left: posX})
        }
    }, []);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    // Новые ссылки!!!
    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <Portal>
            <div
                className={classNames(
                    cls.Modal,
                    {
                        [cls.isClosing]: isClosing,
                    },
                    [className, cls.opened, theme, "app_modal"]
                )}
            >
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
