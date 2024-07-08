import {useLayoutEffect, useState} from "react";

import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import {Bed} from "entities/Bed";
import {fetchBedsData, harvestBeds} from "entities/Bed/model/thunks";
import { CropEnum } from "entities/Bed/model/types";

import FarmMap from "shared/assets/images/farm/map.svg?react";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";

import cls from "./Map.module.scss";

interface MapProps {
  beds: Bed[];
}

export const Map = ({beds}: MapProps) => {
  const dispatch = useAppDispatch();
  //const beds: Bed[] = useSelector(bedsSelector);

  const [emptyFields, setEmptyFields] = useState<Set<HTMLElement>>(new Set());
  const [plantedFields, setPlantedFields] = useState<HTMLElement[]>([]);
  const [plantedBeds, setPlantedBeds] = useState<Bed[]>([]);

  const getClickHandler = (bed: Bed) => () => {
    if (bed.plantedAt) {
      dispatch(
        harvestBeds({
          index: bed.index,
        })
      ).then(() => {
        dispatch(fetchBedsData());
        // Fetch balance
      });
    }
  };

  useLayoutEffect(() => {
    // Это ужасно, но другого выхода нет.
    // если подгружать svg через файл то доступа к жизненному циклу нет
    // приходится развешивать классы и обработчики таким образом

    if (beds.length === 0) return;

    const emptyFields = new Set<HTMLElement>();
    const plantedFields = new Array<HTMLElement>();
    const plantedBeds = new Array<Bed>();

    const listeners: ((event: MouseEvent) => void)[] = [];
    for (let i = 0; i < beds.length; i++) {
      const element = document.getElementById(`bed-${beds[i].index}`);
      element?.setAttribute("class", "");
      if (!beds[i].crop) {
        element && emptyFields.add(element);
      } else {
        element && plantedFields.push(element);
        element && plantedBeds.push(beds[i]);
        element?.classList.add(
          beds[i].crop !== null &&
            Date.now() - new Date(beds[i].plantedAt).getTime() >
              24 * 60 * 60 * 1000
            ? cls[beds[i].crop.toLowerCase()]
            : cls.field
        );
      }
      listeners.push(getClickHandler(beds[i]));
      element?.addEventListener("click", listeners[i]);
    }

    setEmptyFields(emptyFields);
    setPlantedFields(plantedFields);
    setPlantedBeds(plantedBeds);

    return () => {
      for (let i = 0; i < beds.length; i++) {
        const element = document.getElementById(`bed-${beds[i].index}`);
        element?.setAttribute("class", "");
        element?.removeEventListener("click", listeners[i]);
      }
    };
  }, [beds]);

  return (
    <d          {Array.from(emptyFields).map((element) => {
            const position = element.getBoundingClientRect();
            const id = element.getAttribute("id")?.split("-")?.[1];

            if (!id) {
              return null;
            }

            return (
              <div
                className={cls.task}
                style={{
                  top: position.top + position.height / 2 + window.scrollY,
                  left: position.left + position.width / 2 + window.scrollX,
                  transform: "translateX(-50%) translateY(-100%)",
                }}
                onClick={() => {
                  setBedIndex(+id);
                  setOpenedPlantModal(true);
                }}
                key={id}
              >
                <TaskCard
                  text="Посеять растения"
                  coinsCount={`${plantTask?.task.cost ?? 10}`}
                  className={cls.card}
                />
              </div>
            );
          })}iv> 
      {plantedFields.map((element, index) => {
            const position = element.getBoundingClientRect();
            const id = element.getAttribute("id")?.split("-")?.[1];

            if (!id) {
              return null;
            }

            const getFarmProductImage = (crop: CropEnum) => {
              switch (crop) {
                case CropEnum.Carrot:
                  return <Carrot />;
                case CropEnum.Wheat:
                  return <Wheat />;
                case CropEnum.Potato:
                  return <Potato />;
                case CropEnum.Beet:
                  return <Beet />;
                case CropEnum.Flower:
                  return <Flower />;
              }
            };

            return (
              <div
                className={cls.task}
                style={{
                  top: position.top + position.height / 2 + window.scrollY,
                  left: position.left + position.width / 2 + window.scrollX,
                  transform: "translateX(-50%) translateY(-100%)",
                }}
                onClick={() => {}}
                key={id}
              >
                <FarmProductBadge
                  icon={getFarmProductImage(plantedBeds[index].crop)}
                  startTime={new Date(plantedBeds[index].plantedAt).getTime()}
                  endTime={
                    new Date(plantedBeds[index].plantedAt).getTime() + 10_000
                  }
                  onHarvest={() => console.log("harvest")}
                />
              </div>
            );
          })}
        </>
      )}
      <FarmMap />
    </div>
  );
};
