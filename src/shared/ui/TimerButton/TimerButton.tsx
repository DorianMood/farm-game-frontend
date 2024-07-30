import {memo, useEffect, useMemo} from "react";
import Pause from "shared/assets/images/farm/pause.svg?react";
import Play from "shared/assets/images/farm/play.svg?react";
import cls from "./TimerButton.module.scss";
import {useTimer} from "../../../features/FarmGame/SurveyModal/useTimer.ts";

interface TimerButtonProps {
    opened: boolean;
    onSubmit: (b: boolean) => void;
}

const TIMEOUT = 60_000; // minute

export const TimerButton = memo((props: TimerButtonProps) => {
    const {
        onSubmit,
        opened
    } = props;

    const {elapsedTime, isRunning, handlePause, handleReset, handleStart} =
        useTimer();


    useEffect(() => {
        handleReset();
        if (opened) {
            handleStart();
        } else {
            handlePause();
        }
    }, [opened]);

    const progress = Math.min(
        Math.round((elapsedTime / TIMEOUT) * 10000) / 100,
        100,
    );

    const isOver = useMemo(() => progress === 100, [progress]);

    useEffect(() => {
        if (isOver) {
            onSubmit(false);
        }
    }, [isOver]);

    return (
        <div
            onClick={() => (isRunning ? handlePause() : handleStart())}
            className={cls.TimerButton}
            style={{
                background: `linear-gradient(#2a5259, #2a5259) content-box no-repeat, conic-gradient(#FF9595 ${progress}%, 0, #99EB8C ) border-box`,
            }}
        >
            {isRunning ? <Pause/> : <Play/>}
        </div>
    );
});
