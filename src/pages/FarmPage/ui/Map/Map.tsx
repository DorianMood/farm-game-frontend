import FarmMap from "shared/assets/images/farm/map.svg?react";
import { Barns } from "./Barns";
import { Beds } from "./Beds";
import {AnimalEnum} from "entities/Inventory";
import {CustomGame} from "./CustomGame.tsx";

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

  return (
    <div>
      <FarmMap />
      <Beds onHarvestClick={onHarvestBed} onPlantClick={onPlantBed} />
      <Barns onHarvestClick={onHarvestAnimal} />
      <CustomGame onCompleteTask={onCompleteTask}/>
    </div>
  );
};
