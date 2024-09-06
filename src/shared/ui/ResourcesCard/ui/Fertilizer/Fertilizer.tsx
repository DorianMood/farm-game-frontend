import cn from "classnames";
import cls from "./Feretilizer.module.scss";
import {TutorialNameEnum} from "entities/Tutorial/model/types.ts";
import FertilizerIcon from "../../../../assets/images/fertilized.png";
import {ProductCard} from "../../../ProductCard/ProductCard.tsx";
import {fertilizerToImageAndBackgroundMapper} from "../../../../const/pictureAndColorMapping.ts";
import {useState} from "react";

type FertilizerProps = {
    isTutorialResourceCard: boolean;
    isActiveTutorial: boolean;
    currentTutorial: TutorialNameEnum | undefined;
    onClick?: () => void;
}
export const Fertilizer = ({isTutorialResourceCard, isActiveTutorial, currentTutorial, onClick}: FertilizerProps) => {
    const [isShowFertilizerCardInfo, setShowFertilizerCardInfo] = useState(false);

    return (
        <div
            onClick={onClick}
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
                className={cn(cls["product-card"], {
                    [cls["product-card--show"]]: isShowFertilizerCardInfo && isTutorialResourceCard,
                })}
                title={"Удобрения"}
                description={`Нажмите, чтобы ускорить сбор урожая со всех грядок`}
                image={fertilizerToImageAndBackgroundMapper.smallImage}
                background={fertilizerToImageAndBackgroundMapper.background}
            />
        </div>
    )
}