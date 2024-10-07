import useSound from "use-sound";
import {useEffect, useMemo, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal.tsx";
import Bed from "shared/assets/images/game-1/bed.svg?react";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import classNames from "classnames";
import coinSound from "shared/assets/sounds/coins.mp3";
import cls from "./PlantModal.module.scss";
import {plants} from "../consts.ts";
import {ActivePlant, Plant} from "./Plant.tsx";
import {useSelector} from "react-redux";
import {inventorySelector} from "entities/Inventory";
import {AppLink} from "shared/ui/AppLink/AppLink.tsx";
import {RoutePath} from "shared/config/routeConfig/routeConfig.tsx";
import ShopIcon from "shared/assets/icons/shop-24-24.svg?react";
import {SeedEnum,} from "entities/Inventory/model/types.ts";
import {seedToImageAndBackgroundMapper} from "shared/const/pictureAndColorMapping.ts";
import {BackButton} from "shared/ui/BackButton/BackButton.tsx";
import {isSeed} from "../../../BuyProduct/utils.ts";
import {CARD_POSITION} from "../types.ts";
import {useMediaQuery} from "../../../../shared/hooks";

interface Props {
  onClose: () => void;
  onSubmit: (bedPlants: BedPlant) => void;
  opened: boolean;
  bedIndex: number;
}

export interface BedPlant {
  seed: SeedEnum;
  index: number;
}

export const PlantModal = ({ onClose, onSubmit, opened, bedIndex }: Props) => {
  const [hasDoneTask, setDoneTask] = useState<boolean>(false);

  const inventory = useSelector(inventorySelector);

  const [play] = useSound(coinSound);

  const handleSubmit = (plant: BedPlant) => {
    onSubmit(plant);
    setTimeout(onClose, 2_000);
  };

  const handleClickPlant = (plant: SeedEnum | null) => {
    if (plant) {
      setDoneTask(true);
      play();
      handleSubmit({
        seed: plant,
        index: bedIndex,
      });
    }
  };

  const taskAnswer = useMemo(() => {
    if (hasDoneTask) {
      return "success";
    }

    return null;
  }, [hasDoneTask]);

  useEffect(
    () => () => {
      setDoneTask(false);
    },
    [opened]
  );

  const isMobile = useMediaQuery('mobile');

  const activePlants = useMemo(() => {
    return inventory?.items.reduce((acc, item) => {
      if (isSeed(item.inventoryItem)) {
        return {
          ...acc,
          [item.inventoryItem.seed.type]: {
            amount: item.amount,
            description: item.inventoryItem.description,
            harvestTimeout: item.inventoryItem.seed.harvestTimeout,
            background: seedToImageAndBackgroundMapper[item.inventoryItem.seed.type].background,
            image: seedToImageAndBackgroundMapper[item.inventoryItem.seed.type].image,
            smallImage: seedToImageAndBackgroundMapper[item.inventoryItem.seed.type].smallImage,
          },
        };
      }

      return acc;
    }, {} as Record<SeedEnum, ActivePlant>);
  }, [inventory]);

  return (
    <Modal isOpen={opened} className={cls.modal} disableScroll={true}>
      <div className={cls.root}>
        <div className={cls.header}>
          <BackButton className={cls['back-button']} onClick={onClose}/>
          <p className={cls.title}>Засеивание</p>
        </div>
        <p className={cls.description}>Кликните на иконку нужного растения, чтобы засадить грядку <br /> <span
          className={cls['additional-text']}>{`При ${isMobile ? 'долгом нажатии' : 'наведении на иконку'} появится информация о культуре`}</span></p>


      {hasDoneTask && <CoinIcon className={cls.coin}/>}

      <div className={cls.content}>
          <Bed
              className={classNames(cls.bed, {
                [cls.success]: taskAnswer === "success",
                [cls.sprouts]: hasDoneTask,
              })}
          />
        </div>

        <div className={cls.footer}>
          <div className={cls.plants}>
            {plants.map((plant, index) => (
                <Plant
                    key={plant.type}
                    plant={plant}
                    activePlants={activePlants}
                    onClick={handleClickPlant}
                    cardPosition={index > plants.length / 2 ? CARD_POSITION.LEFT : (index === Math.floor(plants.length / 2) ? CARD_POSITION.CENTER : CARD_POSITION.RIGHT)}
                />
            ))}
          </div>
          <AppLink to={RoutePath.shop} className={cls.link}>
            <ShopIcon className={cls["shop-icon"]}/> Магазин{" "}
          </AppLink>
        </div>
      </div>
    </Modal>
  );
};
