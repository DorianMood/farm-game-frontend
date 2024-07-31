import classNames from "classnames";
import {memo} from "react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import cls from "./TaskCard.module.scss";
import PlantIcon from "shared/assets/images/small-plant.png";

interface TaskCardProps {
    className?: string;
    text?: string;
    coinsCount?: string;
    isPlantCard?: boolean;
    isActive?: boolean;
}

export const TaskCard = memo((props: TaskCardProps) => {
    const {className, text, coinsCount, isPlantCard = false,isActive} = props;

    return (
        <div
            className={classNames(
                cls.TaskCard,
                {
                    [cls.active]: isActive,
                },
                [className]
            )}
        >
            {text && <p className={cls.text}>{text}</p>}
            {coinsCount && (
                <div className={cls.coinsCount}>
                    <CoinIcon/>
                    <p className={cls.coinsCountText}>{coinsCount}</p>
                </div>
            )}
            {isPlantCard && <img src={PlantIcon} className={cls.img}/>}
        </div>
    );
});
