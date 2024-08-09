import {memo, useState} from "react";
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
import {ProductCard} from "../ProductCard/ProductCard.tsx";
import {
    fertilizerToImageAndBackgroundMapper,
    vitaminToImageAndBackgroundMapper
} from "../../const/pictureAndColorMapping.ts";

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

    const [isShowFertilizerCardInfo, setShowFertilizerCardInfo] = useState(false);
    const [isShowVitaminCardInfo, setShowVitaminCardInfo] = useState(false);

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
            {hasFertilizer && (
                <div
                    onClick={onClickFertilizer}
                    className={cn(cls.Item, {
                        [cls.tutorialMode]:
                        isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_FERTILIZE,
                    })}
                    onMouseEnter={() => {
                        setShowFertilizerCardInfo(true);
                    }}
                    onMouseLeave={() => {
                        setShowFertilizerCardInfo(false);
                    }}
                >
                    <img className={cls.fertilizer} src={FertilizerIcon} alt="fertilizer-icon"/>
                    <p className={cls.text}>1</p>
                    <ProductCard
                        className={classNames(cls["product-card"], {
                            [cls["product-card--show"]]: isShowFertilizerCardInfo && currentTutorial !== TutorialNameEnum.ON_FERTILIZE,
                        })}
                        title={"Удобрения"}
                        description={`Нажмите, чтобы ускорить сбор урожая со всех грядок`}
                        image={fertilizerToImageAndBackgroundMapper.smallImage}
                        background={fertilizerToImageAndBackgroundMapper.background}
                    />
                </div>
            )}
            {hasVitamin && (
                <div
                    onClick={onClickVitamin}
                    className={cn(cls.Item, {
                        [cls.tutorialMode]:
                        isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_VITAMIN,
                    })}
                    onMouseEnter={() => {
                        setShowVitaminCardInfo(true);
                    }}
                    onMouseLeave={() => {
                        setShowVitaminCardInfo(false);
                    }}
                >
                    <img className={cls.fertilizer} src={VitaminIcon} alt="vitamin-icon"/>
                    <p className={cls.text}>1</p>
                    <ProductCard
                        className={classNames(cls["product-card"], {
                            [cls["product-card--show"]]: isShowVitaminCardInfo && currentTutorial !== TutorialNameEnum.ON_VITAMIN,
                        })}
                        title={"Витамины"}
                        description={`Нажмите, чтобы ускорить сбор ресурсов со всех животных`}
                        image={vitaminToImageAndBackgroundMapper.smallImage}
                        background={vitaminToImageAndBackgroundMapper.background}
                    />
                </div>
            )}
        </div>
    );
});
