import useSound from "use-sound";
import { useMemo, useState, DragEvent, useEffect } from "react";
import { Modal } from "shared/ui/Modal/Modal.tsx";
import Back from "shared/assets/images/farm/back.svg?react";
import Pause from "shared/assets/images/farm/pause.svg?react";
import Play from "shared/assets/images/farm/play.svg?react";
import Bed from "shared/assets/images/game-1/bed.svg?react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import classNames from "classnames";
import coinSound from "shared/assets/sounds/coins.mp3";
import cls from "./PlantModal.module.scss";
import { plants } from "../consts.ts";
import { ActivePlant, Plant } from "./Plant.tsx";
import { useSelector } from "react-redux";
import { InventoryItem, inventorySelector } from "entities/Inventory";
import { AppLink } from "shared/ui/AppLink/AppLink.tsx";
import { RoutePath } from "shared/config/routeConfig/routeConfig.tsx";
import ShopIcon from "shared/assets/icons/shop-24-24.svg?react";
import {
  InventoryItemCategoryEnum,
  InventoryItemSeed,
  SeedEnum,
} from "entities/Inventory/model/types.ts";

interface Props {
  onClose: () => void;
  onSubmit: (bedPlants: BedPlant) => void;
  opened: boolean;
  bedIndex: number;
}

export interface BedPlant {
  seed: SeedEnum;
  index: number;
}

const isSeed = (
  inventoryItem: InventoryItem,
): inventoryItem is InventoryItemSeed => {
  return inventoryItem.category === InventoryItemCategoryEnum.Seed;
};

export const PlantModal = ({ onClose, onSubmit, opened, bedIndex }: Props) => {
  const [paused, setPaused] = useState<boolean>(false);
  const [plant, setPlant] = useState<SeedEnum | null>();
  const [dragged, setDragged] = useState<boolean>(false);
  const [hasDoneTask, setDoneTask] = useState<boolean>(false);

  const inventory = useSelector(inventorySelector);

  const [play] = useSound(coinSound);

  const handleSubmit = (plant: BedPlant) => {
    onSubmit(plant);
    setTimeout(onClose, 2_000);
  };

  const handleChangePlant = (item: SeedEnum | null) => {
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
    if (plant) {
      setDoneTask(true);
      play();
      handleSubmit({
        seed: plant,
        index: bedIndex,
      });
    }

    setPlant(null);
  };

  const taskAnswer = useMemo(() => {
    if (!plant || !dragged) {
      return null;
    }
    return "success";
  }, [plant, dragged]);

  useEffect(
    () => () => {
      setDoneTask(false);
      setDragged(false);
      setPaused(false);
      setPlant(null);
    },
    [opened]
  );

  const activePlants = useMemo(() => {
    return inventory?.items.reduce((acc, item) => {
      if (isSeed(item.inventoryItem)) {
        return {
          ...acc,
          [item.inventoryItem.seed.type]: {
            amount: item.amount,
            description: item.inventoryItem.description,
            harvestTimeout: item.inventoryItem.seed.harvestTimeout,
          },
        };
      }

      return acc;
    }, {} as Record<SeedEnum, ActivePlant>);
  }, [inventory]);

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <div onClick={onClose}>
            <Back />
          </div>
          <p className={cls.title}>Засеивание</p>
          <div onClick={() => setPaused((state) => !state)}>
            {paused ? <Play /> : <Pause />}
          </div>
        </div>
        {hasDoneTask && <CoinIcon className={cls.coin} />}

        <div className={cls.content}>
          <Bed
            onDrop={handleBedDrop}
            onDragOver={handleBedDragOver}
            onDragLeave={handleBedDragLeave}
            onClick={handleBedDrop}
            className={classNames(cls.bed, {
              [cls.success]: dragged && taskAnswer === "success",
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
          <AppLink to={RoutePath.shop} className={cls.link}>
            <ShopIcon className={cls["shop-icon"]} /> Магазин{" "}
          </AppLink>
        </div>
      </div>
    </Modal>
  );
};
