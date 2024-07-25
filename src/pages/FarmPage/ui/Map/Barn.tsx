import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { FarmProductBadge } from "shared/ui/FarmProductBadge";

import { AnimalBarn } from "entities/AnimalBarn";
import {AnimalEnum} from "entities/Inventory/model/types";

import { getAnimalImage } from "./utils";

import cls from "../FarmPage.module.scss";

interface BarnProps {
  barn: AnimalBarn;
  onHarvest: () => void;
}

export const Barn = ({barn, onHarvest}: BarnProps) => {
  const [element, setElement] = useState<HTMLElement | null>();
  const [id, setId] = useState<string | null>();

  const getAnimalBarnId = (animalBarn: AnimalBarn) => {
    switch (animalBarn.animal?.type) {
      case AnimalEnum.CowAnimal: {
        return "cows";
      }
      case AnimalEnum.HenAnimal: {
        return "hen-house";
      }
      case AnimalEnum.SheepAnimal: {
        return "sheeps";
      }
      case AnimalEnum.PigAnimal: {
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
    if (barn.animal?.type) {
      element?.classList.add(cls[barn.animal.type.toLowerCase()]);
    }

    return () => {
      element?.setAttribute("class", "");
    };
  }, [barn]);

  const {startTime, endTime, animalImage} = useMemo(() => {
    return {
      startTime: new Date(barn.startedAt).getTime(),
      endTime: new Date(barn.startedAt).getTime() + barn.animal?.harvestTimeout,
      animalImage: getAnimalImage(barn.animal?.type),
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
