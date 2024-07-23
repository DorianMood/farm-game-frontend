import {useEffect, useState} from "react";
import classNames from "classnames";
import {useLongPress} from "@uidotdev/usehooks";

import cls from "./Plant.module.scss";
import {CropEnum} from "entities/Bed/model/types.ts";
import {Text, TextTheme} from "shared/ui/Text/Text.tsx";
import {ProductCard} from "shared/ui/ProductCard/ProductCard.tsx";
import {SeedEnum} from "entities/Inventory/model/types.ts";

export type ActivePlantType = CropEnum;
export type ActivePlant = {
  amount: number;
  description: string;
  harvestTimeout: number;
};

interface Props {
  plant: {
    type: SeedEnum;
    icon: string;
    name: string;
    attributeName: string;
    genitiveСase: string;
  };
  activePlants?: Record<SeedEnum, ActivePlant>;
  isDraggable: boolean;
  handleDragStart: (bedPlants: SeedEnum) => void;
  handlePlantDragEnd: () => void;
}

export const Plant = ({
  isDraggable,
  handleDragStart,
  handlePlantDragEnd,
  plant,
  activePlants,
}: Props) => {
  const [isShowProductInfo, setShowProductInfo] = useState(false);

  const isDisabled = !activePlants || !activePlants[plant.type];
  const additionalInfo = !isDisabled
    ? `Время созревания: ${activePlants[plant.type]?.harvestTimeout}`
    : "";

  const attrs = useLongPress(
    () => {
      setShowProductInfo(true);
    },
    {
      threshold: 500,
      onFinish: () => setShowProductInfo(false),
      onCancel: () => setShowProductInfo(false),
      onStart: () => !isDisabled && handleDragStart(plant.type),
    }
  );

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  return (
    <div
      className={classNames(cls["plant"], {[cls["disabled"]]: isDisabled})}
      data-plant={plant.attributeName}
    >
      <img
        src={plant.icon}
        className={classNames(cls["plant-image"], {
          [cls["disabled"]]: isDisabled,
        })}
        draggable={isDraggable && !isDisabled}
        onDragStart={() => {
          if (!isDisabled) handleDragStart(plant.type);
          setShowProductInfo(false);
        }}
        onTouchStart={attrs.onTouchStart}
        onTouchEnd={attrs.onTouchEnd}
        onDragEnd={handlePlantDragEnd}
        onMouseEnter={() => {
          setShowProductInfo(true);
        }}
        onMouseLeave={() => {
          setShowProductInfo(false);
        }}
      />
      {!isDisabled && (
        <ProductCard
          className={classNames(cls["product-card"], {
            [cls["product-card--show"]]: isShowProductInfo,
          })}
          title={plant.name}
          icon={plant.icon}
          description={activePlants[plant.type]?.description}
          additionalInfo={additionalInfo}
        />
      )}
      {isDisabled && (
        <ProductCard
          className={classNames(cls["product-card"], {
            [cls["product-card--show"]]: isShowProductInfo,
          })}
          description={"У вас нет данной культуры."}
          additionalInfo={`Перейдите в магазин, чтобы приобрести семена ${plant.genitiveСase}.`}
        />
      )}
      <Text
        className={cls.text}
        text={activePlants?.[plant.type]?.amount.toString() ?? "0"}
        theme={TextTheme.PRIMARY}
      />
    </div>
  );
};
