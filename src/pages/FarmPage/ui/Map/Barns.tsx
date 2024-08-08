import { useBarnsController } from "./hooks";
import { Barn } from "./Barn";
import { AnimalBarn } from "entities/AnimalBarn";
import { AnimalEnum } from "entities/Inventory";

interface BarnsProps {
  onHarvestClick: (id: AnimalEnum) => void;
}

export const Barns = ({ onHarvestClick }: BarnsProps) => {
  const { animalBarns } = useBarnsController();

  const getHarvestHandler = (item: AnimalBarn) => () => {
    onHarvestClick(item.animal?.type);
  };

  return (
    <>
      {animalBarns?.map((item) => (
        <Barn barn={item} onHarvest={getHarvestHandler(item)} key={item.id} />
      ))}
    </>
  );
};
