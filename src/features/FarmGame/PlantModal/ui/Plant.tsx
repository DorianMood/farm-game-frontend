import { useEffect, useState } from "react";
import classNames from "classnames";
import cls from "./Plant.module.scss";
import { Text, TextTheme } from "shared/ui/Text/Text.tsx";
import { ProductCard } from "shared/ui/ProductCard/ProductCard.tsx";
import { SeedEnum } from "entities/Inventory/model/types.ts";
import { formatDate } from "../utilts.ts";
import { CARD_POSITION } from "../types.ts";
import ShopIcon from "shared/assets/icons/shop-24-24.svg";
import {useLongPress} from "shared/hooks";

export type ActivePlant = {
  amount: number;
  description: string;
  harvestTimeout: number;
  background: string;
  image: string;
  smallImage: string;
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
  onClick: (plant: SeedEnum | null) => void;
  cardPosition?: CARD_POSITION;
}

export const Plant = ({
  onClick,
  plant,
  activePlants,
  cardPosition = CARD_POSITION.RIGHT,
}: Props) => {
  const [isShowProductInfo, setShowProductInfo] = useState(false);

  const isDisabled = !activePlants || !activePlants[plant.type];
  const additionalInfo = !isDisabled
    ? `Время созревания: ${formatDate(activePlants[plant.type]?.harvestTimeout)}`
    : "";

  const attrs = useLongPress(
    () => {
      setShowProductInfo(true);
    },
    {
      threshold: 500,
      onFinish: () => setShowProductInfo(false),
      onCancel: () => setShowProductInfo(false),
    },
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
      className={classNames(cls["plant"], { [cls["disabled"]]: isDisabled })}
      data-plant={plant.attributeName}
    >
      <img
        src={plant.icon}
        className={classNames(cls["plant-image"], {
          [cls["disabled"]]: isDisabled,
        })}
        onTouchStart={attrs.onTouchStart}
        onTouchEnd={attrs.onTouchEnd}
        onClick={() => !isDisabled && onClick(plant.type)}
        onMouseEnter={() => {
          setShowProductInfo(true);
        }}
        onMouseLeave={() => {
          setShowProductInfo(false);
        }}
      />
      {!isDisabled && (
        <ProductCard
          className={classNames([cls["product-card"], [cls[cardPosition]]], {
            [cls["product-card--show"]]: isShowProductInfo,
          })}
          title={plant.name}
          icon={plant.icon}
          description={activePlants[plant.type]?.description}
          additionalInfo={additionalInfo}
          image={activePlants[plant.type]?.smallImage}
          background={activePlants[plant.type]?.background}
        />
      )}
      {isDisabled && (
        <ProductCard
          className={classNames(
            [
              cls["product-card"],
              [cls[cardPosition]],
              cls["product-card--disabled"],
            ],
            {
              [cls["product-card--show"]]: isShowProductInfo,
            },
          )}
          description={"У вас нет данной культуры."}
          additionalInfo={`Перейдите в магазин, чтобы приобрести семена ${plant.genitiveСase}.`}
          background={
            "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,164,151,1) 180%)"
          }
          image={ShopIcon}
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
