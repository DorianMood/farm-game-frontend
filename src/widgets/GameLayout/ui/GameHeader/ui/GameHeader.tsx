import cn from "classnames";
import {useEffect, useMemo} from "react";
import {StatisticsCard} from "shared/ui/StatisticsCard/StatisticsCard";
import {StatisticsCardType} from "shared/ui/StatisticsCard/types";
import cls from "./GameHeader.module.scss";
import {useSelector} from "react-redux";
import {userSelector} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchUserData} from "entities/User/model/thunks";
import {ResourcesCard} from "shared/ui/ResourcesCard/ResourcesCard";
import {inventorySelector} from "entities/Inventory";
import {activateInventory, fetchInventory} from "entities/Inventory/model/thunks";
import {
  InventoryItemFertilizer,
  InventoryItemSeed,
} from "entities/Inventory/model/types";
import {currentTutorialSelector} from "entities/Tutorial/model/selectors.ts";
import {TutorialNameEnum} from "entities/Tutorial/model/types.ts";
import {RoutePath} from "shared/config/routeConfig/routeConfig.tsx";
import {useNavigate} from "react-router-dom";
import {isFertilizer, isSeed} from "features/BuyProduct/utils";
import {fetchBedsData} from "entities/Bed/model/thunks.ts";

export enum GameHeaderTheme {
  LIGHT = "light",
  GREEN = "green",
}

interface GameHeaderProps {
  theme: GameHeaderTheme;
  className?: string;
}

// TODO: Добавить здесь вызовы, подцепить к беку
export const GameHeader = ({theme}: GameHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const inventory = useSelector(inventorySelector);
  const currentTutorial = useSelector(currentTutorialSelector);

  const balance = user?.ballance;

  const isActiveTutorial = currentTutorial !== undefined;

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

  const handleRatingClick = () => {
    navigate(RoutePath.rating);
  }

  // @ts-ignore
  const seeds: {amount: number; inventoryItem: InventoryItemSeed}[] =
    inventory?.items.filter((item) => isSeed(item.inventoryItem)) ?? [];

  // @ts-ignore
  const fertilizer: {amount: number; inventoryItem: InventoryItemFertilizer} = inventory?.items.find((item) => isFertilizer(item.inventoryItem)) ?? {};

  const handleFertilizerClick = () => {
    dispatch(activateInventory({id: fertilizer?.inventoryItem?.fertilizer?.id}))
    dispatch(fetchInventory());
    dispatch(fetchBedsData());
  }

  return (
    <>
      <div className={cn(cls.content, cls.left)}>
        <ResourcesCard
          balance={balance}
          seeds={seeds.map((seed) => ({
            type: seed.inventoryItem.seed.type,
            amount: seed.amount,
          }))}
          hasFertilizer={!!fertilizer?.inventoryItem}
          onClickFertilizer={handleFertilizerClick}
          className={cn("", {
            [cls.tutorialMode]:
              isActiveTutorial && (currentTutorial !== TutorialNameEnum.BALANCE && currentTutorial !== TutorialNameEnum.ON_PLANT),
          })}
        />
      </div>

      <div className={cn(cls.content, cls.right)}>
        <StatisticsCard
          className={cn(cls[theme], {
            [cls.tutorialMode]:
              isActiveTutorial && currentTutorial !== TutorialNameEnum.DAYS,
          })}
          cardType={StatisticsCardType.DAYS}
          text={date ? `День ${date}` : ""}
        />
        <StatisticsCard
          className={cn(cls[theme], {
            [cls.tutorialMode]:
              isActiveTutorial && currentTutorial !== TutorialNameEnum.RATING,
          })}
          cardType={StatisticsCardType.RATING}
          text={`${user?.rank ?? ""}`}
          onClick={handleRatingClick}
        />
      </div>
    </>
  );
};
