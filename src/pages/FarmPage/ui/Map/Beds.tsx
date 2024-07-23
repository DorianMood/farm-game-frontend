import { useBedsController } from "./hooks";
import { Bed } from "./Bed";
import { Bed as BedType } from "entities/Bed";

interface BedProps {
  onPlantClick: (id: number) => void;
  onHarvestClick: (id: number) => void;
}

export const Beds = ({ onHarvestClick, onPlantClick }: BedProps) => {
  const { beds } = useBedsController();

  const getHarvestHandler = (item: BedType) => () => {
    onHarvestClick(item.index);
  };

  const getPlantHandler = (item: BedType) => () => {
    onPlantClick(item.index);
  };

  return (
    <>
      {beds?.map((item) => (
        <Bed
          bed={item}
          onHarvest={getHarvestHandler(item)}
          onPlant={getPlantHandler(item)}
          key={item.id}
        />
      ))}
    </>
  );
};
