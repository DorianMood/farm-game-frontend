import FarmMap from "shared/assets/images/farm/map.svg?react";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import { Barns } from "./Barns";
import { Beds } from "./Beds";
import { useCustomGameController } from "./hooks";
import { CustomGameModal } from "features/FarmGame";
import {
  PLANTS_VS_ZOMBIES_ORIGIN,
  PLANTS_VS_ZOMBIES_URL,
} from "shared/const/games";
import cls from "../FarmPage.module.scss";
import {AnimalEnum} from "entities/Inventory";

interface MapProps {
  onPlantBed: (bedIndex: number) => void;
  onHarvestBed: (bedIndex: number) => void;
  onHarvestAnimal: (animal: AnimalEnum) => void;
  onCompleteTask: (type: string) => void;
}

export const Map = ({
  onPlantBed,
  onHarvestBed,
  onHarvestAnimal,
  onCompleteTask,
}: MapProps) => {
  const {
    handleOpenCustomGameModal,
    handleCloseCustomGameModal,
    isOpenedCustomGameModal,
    farmCardPosition,
  } = useCustomGameController({ onCompleteTask: onCompleteTask });

  return (
    <div>
      <FarmMap />
      <Beds onHarvestClick={onHarvestBed} onPlantClick={onPlantBed} />
      <Barns onHarvestClick={onHarvestAnimal} />
      {farmCardPosition && (
        <div
          className={cls.task}
          style={{
            ...farmCardPosition,
            transform: "translateX(-50%) translateY(-100%)",
          }}
          onClick={handleOpenCustomGameModal}
        >
          <TaskCard
            text="Спасти ферму от вредителей"
            coinsCount={"50"}
            className={cls.card}
          />
        </div>
      )}
      <CustomGameModal
        opened={isOpenedCustomGameModal}
        onClose={handleCloseCustomGameModal}
        url={PLANTS_VS_ZOMBIES_URL}
        origin={PLANTS_VS_ZOMBIES_ORIGIN}
      />
    </div>
  );
};
