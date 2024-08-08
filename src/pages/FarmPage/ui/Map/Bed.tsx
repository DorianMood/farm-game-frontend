import { Bed as BedType } from "entities/Bed";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import cls from "../FarmPage.module.scss";
import { FarmProductBadge } from "shared/ui/FarmProductBadge";
import { getCropImage } from "./utils";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import classNames from "classnames";
import { currentTutorialSelector } from "entities/Tutorial/model/selectors.ts";
import { useSelector } from "react-redux";
import { TutorialNameEnum } from "entities/Tutorial/model/types.ts";

interface BedProps {
  bed: BedType;
  onHarvest: () => void;
  onPlant: () => void;
}

export const Bed = ({ bed, onHarvest, onPlant }: BedProps) => {
  const [id, setId] = useState<string>();
  const [element, setElement] = useState<HTMLElement | null>();

  const currentTutorial = useSelector(currentTutorialSelector);

  useLayoutEffect(() => {
    if (!bed) return;

    // Search element in the map
    const element = document.getElementById(`bed-${bed.index}`);
    setElement(element);

    // Clear class list
    element?.setAttribute("class", "");

    setId(element?.getAttribute("id")?.split("-")[0]);

    // Click listener
    const plantListener: (event: MouseEvent) => void = () => onPlant();

    // If has crop, then display it
    if (bed.crop) {
      element?.classList.add(
        bed.crop !== null &&
          Date.now() - new Date(bed.plantedAt).getTime() >
            bed.crop?.harvestTimeout
          ? cls[bed.crop?.type?.toLowerCase().replace("seed", "")]
          : cls.field,
      );
    } else {
      element?.addEventListener("click", plantListener);
    }

    return () => {
      element?.setAttribute("class", "");
      element?.removeEventListener("click", plantListener);
    };
  }, [bed, onPlant]);

  const { startTime, endTime, cropImage } = useMemo(() => {
    return {
      startTime: new Date(bed.plantedAt).getTime(),
      endTime: new Date(bed.plantedAt).getTime() + bed.crop?.harvestTimeout,
      cropImage: getCropImage(bed.crop?.type),
    };
  }, [bed]);

  useEffect(() => {
    if (!bed.crop) return;

    const startTime = new Date(bed.plantedAt).getTime();
    const endTime =
      new Date(bed.plantedAt).getTime() + bed.crop?.harvestTimeout;

    const t = setInterval(() => {
      const now = Date.now();
      const progress = Math.ceil(
        ((now - startTime) / (endTime - startTime)) * 100,
      );

      if (progress > 100) {
        element?.setAttribute("class", "");
        element?.classList.add(
          cls[bed.crop?.type?.toLowerCase().replace("seed", "")],
        );
        clearInterval(t);
      }
    }, 1_000 / 60);

    return () => clearInterval(t);
  }, [bed, element]);

  if (!id || !element) {
    return null;
  }

  const position = element?.getBoundingClientRect();
  const rootPosition = document.getElementById("root")?.getBoundingClientRect();

  // Empty bed
  if (!bed.crop) {
    return (
      <div
        className={classNames(cls.task, {
          [cls.tutorialMode]: currentTutorial === TutorialNameEnum.ON_PLANT,
        })}
        style={{
          top: position.top + position.height / 2 - (rootPosition?.y ?? 0),
          left: position.left + position.width / 2 - (rootPosition?.x ?? 0),
          transform: "translateX(-50%) translateY(-100%)",
        }}
        onClick={onPlant}
        key={id}
      >
        <TaskCard
          text="Посеять растение"
          className={cls.card}
          isPlantCard={true}
        />
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.task, {
        [cls.tutorialMode]: currentTutorial === TutorialNameEnum.ON_HARVEST,
      })}
      style={{
        top: position.top + position.height / 2 - (rootPosition?.y ?? 0),
        left: position.left + position.width / 2 - (rootPosition?.x ?? 0),
        transform: "translateX(-50%) translateY(-100%)",
      }}
      key={id}
    >
      <FarmProductBadge
        icon={cropImage}
        startTime={startTime}
        endTime={endTime}
        onHarvest={onHarvest}
      />
    </div>
  );
};
