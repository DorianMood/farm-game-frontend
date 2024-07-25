import {memo} from "react";
import classNames from "classnames";
import CoinsIcon from "shared/assets/icons/coins-20-20.svg?react";
import cls from "./ResourcesCard.module.scss";
import {cropIconMapper} from "./utils";
import {SeedEnum} from "entities/Inventory/model/types.ts";
import cn from "classnames";
import {TutorialNameEnum} from "../../../entities/Tutorial/model/types.ts";
import {useSelector} from "react-redux";
import {currentTutorialSelector} from "../../../entities/Tutorial/model/selectors.ts";

interface Seed {
  type: SeedEnum;
  amount: number;
}

interface ResourcesCardProps {
  className?: string;
  balance?: number;
  seeds: Seed[];
}

export const ResourcesCard = memo((props: ResourcesCardProps) => {
  const {className, seeds, balance} = props;
  const currentTutorial = useSelector(currentTutorialSelector);
  const isActiveTutorial = currentTutorial !== undefined;

  return (
      <div className={classNames(cls.Card, {}, [className])}>
        <div className={cn(cls.Item, {
          [cls.tutorialMode]:
          isActiveTutorial && currentTutorial !== TutorialNameEnum.BALANCE,
        })} >
          <CoinsIcon/>
            {balance && <p className={cls.text}>{balance}</p>}
        </div>
        {seeds.map((item) => (
            <div className={cn(cls.Item, {
              [cls.tutorialMode]:
              isActiveTutorial && currentTutorial !== TutorialNameEnum.ON_PLANT,
            })} key={item.type}>
              {cropIconMapper[item.type]}
              <p className={cls.text}>{item.amount}</p>
            </div>
        ))}
      </div>
  );
});
