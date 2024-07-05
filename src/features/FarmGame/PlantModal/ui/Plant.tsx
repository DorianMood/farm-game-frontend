import cls from "./Plant.module.scss";
import classNames from "classnames";
import {CropEnum} from "../../../../entities/Bed/model/types.ts";
import {Text, TextTheme} from "../../../../shared/ui/Text/Text.tsx";

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
    }
    activePlants?: Record<ActivePlantType, ActivePlant>,
    isDraggable: boolean;
    handleDragStart: (bedPlants: CropEnum) => void;
    handlePlantDragEnd: () => void;
}

export const Plant = ({isDraggable, handleDragStart, handlePlantDragEnd, plant, activePlants}: Props) => {
    const isDisabled = !activePlants || !activePlants[plant.type]
    return <div
        draggable={isDraggable && !isDisabled}
        onDragStart={() => handleDragStart(plant.type)}
        onDragEnd={handlePlantDragEnd}
        className={classNames(cls['plant'], {[cls['disabled']]: isDisabled})}
        data-plant={plant.name}
    >
        <img src={plant.icon} className={cls['plant-image']} draggable={isDraggable && !isDisabled}/>
        <Text
            className={cls.text}
            text={!isDisabled ? activePlants[plant.type]?.amount.toString() : ""}
            theme={TextTheme.PRIMARY}
        />
    </div>
}