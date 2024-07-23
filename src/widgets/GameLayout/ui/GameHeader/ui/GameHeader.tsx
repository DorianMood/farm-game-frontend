import classNames from "classnames";
import { useEffect, useMemo } from "react";
import { StatisticsCard } from "shared/ui/StatisticsCard/StatisticsCard";
import { StatisticsCardType } from "shared/ui/StatisticsCard/types";
import cls from "./GameHeader.module.scss";
import { useSelector } from "react-redux";
import { userSelector } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchUserData } from "entities/User/model/thunks";
import { ResourcesCard } from "shared/ui/ResourcesCard/ResourcesCard";
import { InventoryItem, inventorySelector } from "entities/Inventory";
import { fetchInventory } from "entities/Inventory/model/thunks";
import {
  InventoryItemCategoryEnum,
  InventoryItemSeed,
} from "entities/Inventory/model/types";
import {currentTutorialSelector} from "../../../../../entities/Tutorial/model/selectors.ts";
import {TutorialNameEnum} from "../../../../../entities/Tutorial/model/types.ts";


export enum GameHeaderTheme {
  LIGHT = "light",
  GREEN = "green",
}

interface GameHeaderProps {
  theme: GameHeaderTheme;
  className?: string;
}

// TODO: Добавить здесь вызовы, подцепить к беку
export const GameHeader = ({ theme, className }: GameHeaderProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const inventory = useSelector(inventorySelector);
  const currentTutorial = useSelector(currentTutorialSelector);

  const balance = user?.ballance ?? 0;

  const isActiveTutorial = currentTutorial !== undefined;

  const date = useMemo(
    () =>
      user?.createdAt
        ? Math.ceil(
            (new Date().valueOf() - new Date(user?.createdAt).valueOf()) /
              (1000 * 60 * 60 * 24),
          )
        : null,
    [user?.createdAt],
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

  const isSeed = (
    inventoryItem: InventoryItem,
  ): inventoryItem is InventoryItemSeed => {
    return inventoryItem.category === InventoryItemCategoryEnum.Seed;
  };

  // @ts-ignore
  const seeds: { amount: number; inventoryItem: InventoryItemSeed }[] =
    inventory?.items.filter((item) => isSeed(item.inventoryItem)) ?? [];

  return (
    <div className={classNames(cls.GameHeader, {}, [className])}>
      <div className={cls.content}>
        <ResourcesCard
            balance={balance}
            seeds={seeds.map((seed) => ({
              type: seed.inventoryItem.seed.type,
              amount: seed.amount,
            }))}
            className={classNames("", {[cls.tutorialMode]: isActiveTutorial && currentTutorial !== TutorialNameEnum.BALANCE})}
        />
      </div>
      <div className={cls.content}>
        <StatisticsCard
          className={classNames(cls[theme], {[cls.tutorialMode]: isActiveTutorial && currentTutorial !== TutorialNameEnum.DAYS})}
          cardType={StatisticsCardType.DAYS}
          text={date ? `День ${date}` : ""}
        />
        <StatisticsCard
          className={classNames(cls[theme], {[cls.tutorialMode]: isActiveTutorial  && currentTutorial !== TutorialNameEnum.RATING})}
          cardType={StatisticsCardType.RATING}
          text="10"
        />
      </div>
    </div>
  );
};
