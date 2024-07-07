import useSound from "use-sound";
import {useMemo, useState, DragEvent, useEffect} from "react";
import {Modal} from "shared/ui/Modal/Modal.tsx";
import Back from "shared/assets/images/farm/back.svg?react";
import Pause from "shared/assets/images/farm/pause.svg?react";
import Play from "shared/assets/images/farm/play.svg?react";
import Bed from "shared/assets/images/game-1/bed.svg?react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import classNames from "classnames";
import coinSound from "shared/assets/sounds/coins.mp3";
import cls from "./PlantModal.module.scss";
import {CropEnum} from "entities/Bed/model/types.ts";
import {plants} from "../consts.ts";
import {ActivePlant, ActivePlantType, Plant} from "./Plant.tsx";
import {useSelector} from "react-redux";
import {inventorySelector} from "entities/Inventory";
import {
    FarmProductAnimal,
    FarmProductCrop,
    FarmProductSeed,
    InventoryEnums
} from "entities/Inventory/model/types.ts";
import {AppLink} from "shared/ui/AppLink/AppLink.tsx";
import {RoutePath} from "shared/config/routeConfig/routeConfig.tsx";
import ShopIcon from 'shared/assets/icons/shop-24-24.svg?react';

function isSeed(farmProduct: FarmProductAnimal | FarmProductSeed | FarmProductCrop): farmProduct is FarmProductSeed {
    return farmProduct.type === InventoryEnums.FarmProductEnum.Seed;
}

interface Props {
    onClose: () => void;
    onSubmit: (bedPlants: BedPlant) => void;
    opened: boolean;
    bedIndex: number;
}

const OPTIONS = {
    [CropEnum.Carrot]: "морковь",
    [CropEnum.Potato]: "картофель",
    [CropEnum.Beet]: "свекла",
    [CropEnum.Flower]: "цветы",
    [CropEnum.Wheat]: "пшеница",
};

export interface BedPlant {
    crop: CropEnum;
    index: number;
}

export const PlantModal = ({onClose, onSubmit, opened, bedIndex}: Props) => {
    const [paused, setPaused] = useState<boolean>(false);
    const [plant, setPlant] = useState<CropEnum | null>();
    const [dragged, setDragged] = useState<boolean>(false);
    const [hasDoneTask, setDoneTask] = useState<boolean>(false);

    const inventory = useSelector(inventorySelector);

    const desiredCrop = useMemo(() => {
        const entries = Object.entries(OPTIONS);
        const index = Math.floor(Math.random() * 5);
        return entries[index];
    }, [opened]);

    const [play] = useSound(coinSound);

    const handleSubmit = (plant: BedPlant) => {
        onSubmit(plant);
        setTimeout(onClose, 2_000);
    };

    const handleChangePlant = (item: CropEnum | null) => {
        setPlant(item);
    };

    const handlePlantDragEnd = () => {
        handleChangePlant(null);
        setDragged(false);
    };

    const handleBedDragOver = (event: DragEvent<SVGSVGElement>) => {
        event.preventDefault();
        setDragged(true);
    };

    const handleBedDragLeave = (event: DragEvent<SVGSVGElement>) => {
        event.preventDefault();
        setDragged(false);
    };

    const handleBedDrop = () => {
        if (taskAnswer === "success" && plant) {
            setDoneTask(true);
            play();
            handleSubmit({
                crop: plant,
                index: bedIndex,
            });
        }

        setPlant(null);
    };

    const taskAnswer = useMemo(() => {
        if (!plant || !dragged) {
            return null;
        }
        return desiredCrop[0] === plant ? "success" : "wrong";
    }, [plant, dragged, desiredCrop]);

    useEffect(
        () => () => {
            setDoneTask(false);
            setDragged(false);
            setPaused(false);
            setPlant(null);
        },
        [opened],
    );

    const activePlants = useMemo(() => {
        return inventory?.items.reduce(
            (acc, item) => {
                if (isSeed(item.farmProduct)) {
                    return {...acc,
                        [item.farmProduct.seed.crop.type]: {
                            amount: item.amount,
                            description: item.farmProduct.seed.crop.description,
                            harvestTimeout: item.farmProduct.seed.crop.harvestTimeout,
                        }
                    }
                }

                return acc
            }, {} as Record<ActivePlantType, ActivePlant>
        )
    }, [inventory]);

    return (
        <Modal isOpen={opened} className={cls.modal}>
            <div className={cls.root}>
                <div className={cls.header}>
                    <div onClick={onClose}>
                        <Back/>
                    </div>
                    <span>Засеивание</span>
                    <div onClick={() => setPaused((state) => !state)}>
                        {paused ? <Play/> : <Pause/>}
                    </div>
                </div>
                {hasDoneTask && <CoinIcon className={cls.coin}/>}

                <div className={cls.content}>
                    <div data-crop={desiredCrop[0]} className={cls["bed-desired-plant"]}>
                        {desiredCrop[1]}
                    </div>
                    <Bed
                        onDrop={handleBedDrop}
                        onDragOver={handleBedDragOver}
                        onDragLeave={handleBedDragLeave}
                        className={classNames(cls.bed, {
                            [cls.success]: dragged && taskAnswer === "success",
                            [cls.wrong]: dragged && taskAnswer === "wrong",
                            [cls.sprouts]: hasDoneTask,
                        })}
                    />
                </div>

                <div className={cls.footer}>
                    <div className={cls.plants}>
                        {plants.map((plant) => (
                            <Plant
                                key={plant.type}
                                plant={plant}
                                activePlants={activePlants}
                                isDraggable={!hasDoneTask}
                                handleDragStart={handleChangePlant}
                                handlePlantDragEnd={handlePlantDragEnd}
                            />
                        ))}
                    </div>
                    <AppLink to={RoutePath.shop} className={cls.link}> <ShopIcon className={cls['shop-icon']}/> Магазин </AppLink>
                </div>

            </div>
        </Modal>
    );
};
