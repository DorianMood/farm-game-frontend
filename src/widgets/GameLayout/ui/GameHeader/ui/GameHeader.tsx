import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { StatisticsCard } from "shared/ui/StatisticsCard/StatisticsCard";
import { StatisticsCardType } from "shared/ui/StatisticsCard/types";
import cls from "./GameHeader.module.scss";
import { useSelector } from "react-redux";
import { userSelector } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchUserData } from "entities/User/model/thunks";
import {ResourcesCard} from "shared/ui/ResourcesCard/ResourcesCard";
import {CropEnum} from "entities/Bed/model/types";
import {FarmProductEnum, inventorySelector} from "entities/Inventory";
import {fetchInventory} from "entities/Inventory/model/thunks";
import {FarmProductSeed, InventoryEnums} from "entities/Inventory/model/types";

export enum GameHeaderTheme {
  LIGHT = "light",
  GREEN = "green",
}

interface GameHeaderProps {
  theme: GameHeaderTheme;
  className?: string;
}

// TODO: Добавить здесь вызовы, подцепить к беку
export const GameHeader = ({theme, className}: GameHeaderProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const inventory = useSelector(inventorySelector);

  const balance = user?.ballance ?? 0;

  const date = useMemo(
    () =>
      user?.createdAt
        ? Math.ceil(
            (new Date().valueOf() - new Date(user?.createdAt).valueOf()) /
              (1000 * 60 * 60 * 24)
          )
        : null,
    [user?.createdAt]
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!inventory) {
      dispatch(fetchInventory());
    }
  }, [dispatch, inventory]);

  const seeds =
    inventory?.items.filter(
      (item) => item.farmProduct.type === InventoryEnums.FarmProductEnum.Seed
    ) ?? [];

  return (
    <div className={classNames(cls.GameHeader, {}, [className])}>
      <div className={cls.content}>
        <ResourcesCard
          balance={balance}
          seeds={seeds.map((seed) => ({
            type: (seed.farmProduct as FarmProductSeed).seed.crop.type,
            amount: seed.amount,
          }))}
        />
      </div>
      <div className={cls.content}>
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.DAYS}
          text={date ? `День ${date}` : ""}
        />
        <StatisticsCard
          className={cls[theme]}
          cardType={StatisticsCardType.RATING}
          text="10"
        />
      </div>
    </div>
  );
};
