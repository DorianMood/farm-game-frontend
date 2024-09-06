import cn from "classnames";
import cls from "./Vitamin.module.scss";
import {TutorialNameEnum} from "entities/Tutorial/model/types.ts";
import {ProductCard} from "../../../ProductCard/ProductCard.tsx";
import {
    vitaminToImageAndBackgroundMapper
} from "../../../../const/pictureAndColorMapping.ts";
import {useState} from "react";
import VitaminIcon from "../../../../assets/images/vitamins.png";

type FertilizerProps = {
    isTutorialResourceCard: boolean;
    isActiveTutorial: boolean;
    currentTutorial: TutorialNameEnum | undefined;
    onClick?: () => void;
}
export const Vitamin = ({isTutorialResourceCard, isActiveTutorial, currentTutorial, onClick}: FertilizerProps) => {
    const [isShowVitaminCardInfo, setShowVitaminCardInfo] = useState(false);

    return (
        <div
            onClick={onClick}
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
                className={cn(cls["product-card"], {
                    [cls["product-card--show"]]: isShowVitaminCardInfo && isTutorialResourceCard,
                })}
                title={"Витамины"}
                description={`Нажмите, чтобы ускорить сбор ресурсов со всех животных`}
                image={vitaminToImageAndBackgroundMapper.smallImage}
                background={vitaminToImageAndBackgroundMapper.background}
            />
        </div>
    )
}