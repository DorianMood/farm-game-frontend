import React, {FormEvent} from "react";

export type LongPressOptions = {
    threshold?: number;
    onStart?: (e: FormEvent) => void;
    onFinish?: (e: FormEvent) => void;
    onCancel?: (e: FormEvent) => void;
};

export type LongPressFns = {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
};

function isMouseEvent(event: FormEvent) {
    return event.nativeEvent instanceof MouseEvent;
}

function isTouchEvent({ nativeEvent }: FormEvent) {
    return window.TouchEvent
        ? nativeEvent instanceof TouchEvent
        : "touches" in nativeEvent;
}

export const useLongPress = (callback: (e: FormEvent) => void, options: LongPressOptions = {}): LongPressFns =>  {
    const { threshold = 400, onStart, onFinish, onCancel } = options;
    const isLongPressActive = React.useRef(false);
    const isPressed = React.useRef(false);
    const timerId = React.useRef<number>();

    return <LongPressFns>React.useMemo(() => {
        if (typeof callback !== "function") {
            return {};
        }

        const start = (event: FormEvent) => {
            if (!isMouseEvent(event) && !isTouchEvent(event)) return;

            if (onStart) {
                onStart(event);
            }

            isPressed.current = true;
            timerId.current = setTimeout(() => {
                callback(event);
                isLongPressActive.current = true;
            }, threshold);
        };

        const cancel = (event: FormEvent) => {
            if (!isMouseEvent(event) && !isTouchEvent(event)) return;

            if (isLongPressActive.current) {
                if (onFinish) {
                    onFinish(event);
                }
            } else if (isPressed.current) {
                if (onCancel) {
                    onCancel(event);
                }
            }

            isLongPressActive.current = false;
            isPressed.current = false;

            if (timerId.current) {
                window.clearTimeout(timerId.current);
            }
        };

        const mouseHandlers = {
            onMouseDown: start,
            onMouseUp: cancel,
            onMouseLeave: cancel,
        };

        const touchHandlers = {
            onTouchStart: start,
            onTouchEnd: cancel,
        };

        return {
            ...mouseHandlers,
            ...touchHandlers,
        };
    }, [callback, threshold, onCancel, onFinish, onStart]);
}