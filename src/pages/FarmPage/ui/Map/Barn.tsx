import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { FarmProductBadge } from "shared/ui/FarmProductBadge";

import { AnimalBarn } from "entities/AnimalBarn";
import { InventoryEnums } from "entities/Inventory/model/types";

import { getAnimalImage } from "./utils";

import cls from "../FarmPage.module.scss";

interface BarnProps {
  barn: AnimalBarn;
  onHarvest: () => void;
}

const ANIMAL_TIMEOUT = 10_000;

export const Barn = ({ barn, onHarvest }: BarnProps) => {
  const [element, setElement] = useState<HTMLElement | null>();
  const [id, setId] = useState<string | null>();

  const getAnimalBarnId = (animalBarn: AnimalBarn) => {
    switch (animalBarn.animal) {
      case InventoryEnums.AnimalEnum.Cow: {
        return "cows";
      }
      case InventoryEnums.AnimalEnum.Hen: {
        return "hen-house";
      }
      case InventoryEnums.AnimalEnum.Sheep: {
        return "sheeps";
      }
      case InventoryEnums.AnimalEnum.Pig: {
        return "pigs";
      }
    }
  };

  useLayoutEffect(() => {
    if (!barn) return;

    // Search element in the map
    const element = document.getElementById(getAnimalBarnId(barn));

    // Clear class list
    element?.setAttribute("class", "");

    setElement(element);
    setId(element?.getAttribute("id"));

    // If has crop, then display it
    if (barn.animal) {
      element?.classList.add(cls[barn.animal.toLowerCase()]);
    }

    return () => {
      element?.setAttribute("class", "");
    };
  }, [barn]);

  const { startTime, endTime, animalImage } = useMemo(() => {
    return {
      startTime: new Date(barn.startTime).getTime(),
      endTime: new Date(barn.startTime).getTime() + ANIMAL_TIMEOUT,
      animalImage: getAnimalImage(barn.animal),
    };
  }, [barn]);

  useEffect(() => {
    // Search element in the map
    const element = document.getElementById(getAnimalBarnId(barn));

    setElement(element);
  }, [barn]);

  if (!id || !element) {
    return null;
  }

  const position = element?.getBoundingClientRect();

  return (
    <div
      className={cls.task}
      style={{
        top: position.top + position.height / 2 + window.scrollY,
        left: position.left + position.width / 2 + window.scrollX,
        transform: "translateX(-50%) translateY(-100%)",
      }}
      key={id}
    >
      <FarmProductBadge
        icon={animalImage}
        startTime={startTime}
        endTime={endTime}
        onHarvest={onHarvest}
      />
    </div>
  );
};
