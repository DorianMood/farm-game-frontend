import {memo, useState} from "react";
import classNames from "classnames";
import CoinsIcon from "shared/assets/icons/coins-20-20.svg?react";
import cls from "./ResourcesCard.module.scss";
import {cropIconMapper} from "./utils";
import {SeedEnum} from "entities/Inventory/model/types.ts";
import cn from "classnames";
import {TutorialNameEnum} from "entities/Tutorial/model/types.ts";
import {useSelector} from "react-redux";
import {currentTutorialSelector} from "entities/Tutorial/model/selectors.ts";
import {useMediaQuery} from "../../hooks";
import {Fertilizer} from "./ui/Fertilizer/Fertilizer.tsx";
import {Vitamin} from "./ui/Vitamin/Vitamin.tsx";

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

    const [isHeaderOpen, setHeaderOpen] = useState(false);

    const currentTutorial = useSelector(currentTutorialSelector);
    const isActiveTutorial = currentTutorial !== undefined;

    const isTutorialResourceCard = currentTutorial !== TutorialNameEnum.BALANCE && currentTutorial !== TutorialNameEnum.ON_PLANT && currentTutorial !== TutorialNameEnum.ON_FERTILIZE && currentTutorial !== TutorialNameEnum.ON_VITAMIN

    const isMobile = useMediaQuery('mobile');
    const resourcesCount = seeds.length + Number(hasVitamin) + Number(hasFertilizer);

    return (
        <div className={classNames(cls.Card, {}, [className])}>
            <div className={cn(cls.Item, {
                [cls.tutorialMode]:
                isActiveTutorial && currentTutorial !== TutorialNameEnum.BALANCE,
            })}>
                <CoinsIcon/>
                {balance && <p className={cls.text}>{balance}</p>}
            </div>
            {(isMobile && !isHeaderOpen && resourcesCount > 1 && !isActiveTutorial)
                ? <>
                    {seeds.length
                        ? <div className={cn(cls.Item, {
                            [cls.tutorialMode]:
                            isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_PLANT,
                        })} key={seeds[0].type}>
                            {cropIconMapper[seeds[0].type]}
                            <p className={cls.text}>{seeds[0].amount}</p>
                        </div>
                        : <>
                            {hasFertilizer && !hasVitamin && (
                                <Fertilizer
                                    isTutorialResourceCard={isTutorialResourceCard}
                                    isActiveTutorial={isActiveTutorial}
                                    currentTutorial={currentTutorial}
                                    onClick={onClickFertilizer}
                                />
                            )}
                            {!hasFertilizer && hasVitamin && (
                                <Vitamin
                                    isTutorialResourceCard={isTutorialResourceCard}
                                    isActiveTutorial={isActiveTutorial}
                                    currentTutorial={currentTutorial}
                                    onClick={onClickVitamin}
                                />
                            )}
                        </>}
                    <div className={cls.more} onClick={() => setHeaderOpen(true)}>
                        Ещё {resourcesCount - 1}
                    </div>
                </>
                : <>
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
                        <Fertilizer
                            isTutorialResourceCard={isTutorialResourceCard}
                            isActiveTutorial={isActiveTutorial}
                            currentTutorial={currentTutorial}
                            onClick={onClickFertilizer}
                        />
                    )}
                    {hasVitamin && (
                        <Vitamin
                            isTutorialResourceCard={isTutorialResourceCard}
                            isActiveTutorial={isActiveTutorial}
                            currentTutorial={currentTutorial}
                            onClick={onClickVitamin}
                        />
                    )}
                    {isMobile && isHeaderOpen && (
                        <div className={cls.more} onClick={() => setHeaderOpen(false)}>
                            Скрыть
                        </div>
                    )}
                </>}
        </div>
    );
});
