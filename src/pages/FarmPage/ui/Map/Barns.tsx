import { useBarnsController } from "./hooks";
import { Barn } from "./Barn";
import { AnimalBarn } from "entities/AnimalBarn";

interface BarnsProps {
  onHarvestClick: (id: number) => void;
}

export const Barns = ({ onHarvestClick }: BarnsProps) => {
  const { animalBarns } = useBarnsController();

  const getHarvestHandler = (item: AnimalBarn) => () => {
    onHarvestClick(item.index);
  };

  return (
    <>
      {animalBarns?.map((item) => (
        <Barn barn={item} onHarvest={getHarvestHandler(item)} key={item.id} />
      ))}
    </>
  );
};
