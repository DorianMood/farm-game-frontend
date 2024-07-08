import { Bed as BedType } from "entities/Bed";
import { useLayoutEffect, useMemo, useState } from "react";

import cls from "../FarmPage.module.scss";
import { FarmProductBadge } from "shared/ui/FarmProductBadge";
import { getCropImage } from "./utils";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";

interface BedProps {
  bed: BedType;
  onHarvest: () => void;
  onPlant: () => void;
}

export const Bed = ({ bed, onHarvest, onPlant }: BedProps) => {
  const [position, setPosition] = useState<DOMRect>();
  const [id, setId] = useState<string>();

  useLayoutEffect(() => {
    if (!bed) return;

    // Search element in the map
    const element = document.getElementById(`bed-${bed.index}`);

    // Clear class list
    element?.setAttribute("class", "");

    setPosition(element?.getBoundingClientRect());
    setId(element?.getAttribute("id")?.split("-")[0]);

    // Click listener
    const plantListener: (event: MouseEvent) => void = () => onPlant();

    // If has crop, then display it
    if (bed.crop) {
      element?.classList.add(
        bed.crop !== null &&
          Date.now() - new Date(bed.plantedAt).getTime() > 24 * 60 * 60 * 1000
          ? cls[bed.crop.toLowerCase()]
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
      endTime: new Date(bed.plantedAt).getTime() + 10_000,
      cropImage: getCropImage(bed.crop),
    };
  }, [bed]);

  if (!id || !position) {
    return null;
  }

  // Empty bed
  if (!bed.crop) {
    return (
      <div
        className={cls.task}
        style={{
          top: position.top + position.height / 2 + window.scrollY,
          left: position.left + position.width / 2 + window.scrollX,
          transform: "translateX(-50%) translateY(-100%)",
        }}
        onClick={onPlant}
        key={id}
      >
        <TaskCard
          text="Посеять растения"
          coinsCount={`10`}
          className={cls.card}
        />
      </div>
    );
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
        icon={cropImage}
        startTime={startTime}
        endTime={endTime}
        onHarvest={onHarvest}
      />
    </div>
  );
};
