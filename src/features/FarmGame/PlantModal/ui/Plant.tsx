import cls from "./Plant.module.scss";
import classNames from "classnames";
import {CropEnum} from "entities/Bed/model/types.ts";
import {Text, TextTheme} from "shared/ui/Text/Text.tsx";
import {ProductCard} from "shared/ui/ProductCard/ProductCard.tsx";
import {useState} from "react";


export type ActivePlantType = CropEnum.Beet | CropEnum.Carrot | CropEnum.Flower | CropEnum.Potato | CropEnum.Wheat;
export type ActivePlant = {
    amount: number,
    description: string,
    harvestTimeout: number,
};

interface Props {
    plant: {
        type: CropEnum,
        icon: string,
        name: string,
        attributeName: string;
        genitiveСase: string;
    }
    activePlants?: Record<ActivePlantType, ActivePlant>,
    isDraggable: boolean;
    handleDragStart: (bedPlants: CropEnum) => void;
    handlePlantDragEnd: () => void;
}

export const Plant = ({isDraggable, handleDragStart, handlePlantDragEnd, plant, activePlants}: Props) => {
    const [isShowProductInfo, setShowProductInfo] = useState(false);

    const isDisabled = !activePlants || !activePlants[plant.type];
    const additionalInfo = !isDisabled ? `Время созревания: ${activePlants[plant.type]?.harvestTimeout}` : ''

    const showProductInfo = () => {
        setShowProductInfo(true)
    }

    const hideProductInfo = () => {
        setShowProductInfo(false)
    }

    return (
        <div
            className={classNames(cls['plant'], {[cls['disabled']]: isDisabled})}
            data-plant={plant.attributeName}
        >
            <img
                src={plant.icon}
                className={classNames(cls['plant-image'], {[cls['disabled']]: isDisabled})}
                draggable={isDraggable && !isDisabled}
                onDragStart={() => handleDragStart(plant.type)}
                onDragEnd={handlePlantDragEnd}
                onMouseEnter={showProductInfo}
                onMouseLeave={hideProductInfo}
            />
            {!isDisabled &&
                <ProductCard
                    className={classNames(cls['product-card'], {[cls['product-card--show']]: isShowProductInfo})}
                    title={plant.name}
                    icon={plant.icon}
                    description={activePlants[plant.type]?.description}
                    additionalInfo={additionalInfo}
                />
            }
            {isDisabled &&
                <ProductCard
                    className={classNames(cls['product-card'], {[cls['product-card--show']]: isShowProductInfo})}
                    description={'У вас нет данной культуры.'}
                    additionalInfo={`Перейдите в магазин, чтобы приобрести семена ${plant.genitiveСase}.`}
                />
            }
            {!isDisabled && <Text
                className={cls.text}
                text={activePlants[plant.type]?.amount.toString()}
                theme={TextTheme.PRIMARY}
            />}
        </div>
    )
}