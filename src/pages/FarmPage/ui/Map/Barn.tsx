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

export const Barn = ({ barn, onHarvest }: BarnProps) => {
  const [position, setPosition] = useState<DOMRect>();
  const [id, setId] = useState<string | null>();

  useLayoutEffect(() => {
    if (!barn) return;

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

    // Search element in the map
    const element = document.getElementById(getAnimalBarnId(barn));

    // Clear class list
    element?.setAttribute("class", "");

    setPosition(element?.getBoundingClientRect());
    setId(element?.getAttribute("id"));

    // If has crop, then display it
    if (barn.animal) {
      element?.classList.add(
        Date.now() - new Date(barn.startTime).getTime() > 24 * 60 * 60 * 1000
          ? cls[barn.animal.toLowerCase()]
          : cls.field,
      );
    }

    return () => {
      element?.setAttribute("class", "");
    };
  }, [barn]);

  const { startTime, endTime, animalImage } = useMemo(() => {
    return {
      startTime: new Date(barn.startTime).getTime(),
      endTime: new Date(barn.startTime).getTime() + 10_000,
      animalImage: getAnimalImage(barn.animal),
    };
  }, [barn]);

  useEffect(() => {
    // Search element in the map
    const element = document.getElementById("pigs");

    setPosition(element?.getBoundingClientRect());
  }, []);

  if (!id || !position) {
    return null;
  }

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
