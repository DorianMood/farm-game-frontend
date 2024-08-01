import {memo} from "react";
import classNames from "classnames";
import CoinsIcon from "shared/assets/icons/coins-20-20.svg?react";
import FertilizerIcon from "shared/assets/images/fertilized.png";
import VitaminIcon from "shared/assets/images/vitamins.png";
import cls from "./ResourcesCard.module.scss";
import {cropIconMapper} from "./utils";
import {SeedEnum} from "entities/Inventory/model/types.ts";
import cn from "classnames";
import {TutorialNameEnum} from "entities/Tutorial/model/types.ts";
import {useSelector} from "react-redux";
import {currentTutorialSelector} from "entities/Tutorial/model/selectors.ts";

interface Seed {
    type: SeedEnum;
    amount: number;
}

interface ResourcesCardProps {
    className?: string;
    balance?: number;
    seeds: Seed[];
    hasFertilizer?: boolean;
    hasVitamin?: boolean;
    onClickFertilizer?: () => void;
    onClickVitamin?: () => void;
}

export const ResourcesCard = memo((props: ResourcesCardProps) => {
    const {className, seeds, balance, hasFertilizer, onClickFertilizer, hasVitamin, onClickVitamin} = props;
    const currentTutorial = useSelector(currentTutorialSelector);
    const isActiveTutorial = currentTutorial !== undefined;

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            <div className={cn(cls.Item, {
                [cls.tutorialMode]:
                isActiveTutorial && currentTutorial !== TutorialNameEnum.BALANCE,
            })}>
                <CoinsIcon/>
                {balance && <p className={cls.text}>{balance}</p>}
            </div>
            {seeds.map((item) => (
                <div className={cn(cls.Item, {
                    [cls.tutorialMode]:
                    isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_PLANT,
                })} key={item.type}>
                    {cropIconMapper[item.type]}
                    <p className={cls.text}>{item.amount}</p>
                </div>
            ))}
            {hasFertilizer && <div onClick={onClickFertilizer} className={cn(cls.Item, {
                [cls.tutorialMode]:
                isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_FERTILIZE,
            })}>
                <img className={cls.fertilizer} src={FertilizerIcon} alt="fertilizer-icon"/>
                <p className={cls.text}>1</p>
            </div>}
            {hasVitamin && <div onClick={onClickVitamin} className={cn(cls.Item, {
                [cls.tutorialMode]:
                isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_VITAMIN,
            })}>
                <img className={cls.fertilizer} src={VitaminIcon} alt="vitamin-icon"/>
                <p className={cls.text}>1</p>
            </div>}
        </div>
    );
});
