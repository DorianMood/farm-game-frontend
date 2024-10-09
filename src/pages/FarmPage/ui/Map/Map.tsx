import { useRef } from "react";
import FarmMap from "shared/assets/images/farm/map-with-bed-component.svg?react";
import { Barns } from "./Barns";
import { Beds } from "./Beds";
import { AnimalEnum } from "entities/Inventory";
import { CustomGame } from "./CustomGame.tsx";
import { useMapZoom } from "./hooks.tsx";
import styles from "./Map.module.scss";

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
  const ref = useRef<HTMLDivElement>(null);

  useMapZoom(ref);

  return (
    <div ref={ref} id="map-container" className={styles.root}>
      <FarmMap className={styles.map} />
      <Beds onHarvestClick={onHarvestBed} onPlantClick={onPlantBed} />
      <Barns onHarvestClick={onHarvestAnimal} />
      <CustomGame onCompleteTask={onCompleteTask} />
    </div>
  );
};
