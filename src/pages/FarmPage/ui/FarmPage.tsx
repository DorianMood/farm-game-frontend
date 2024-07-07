import FarmMap from "shared/assets/images/farm/map.svg?react";
import { useSelector } from "react-redux";
import { Bed, bedsSelector } from "entities/Bed";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  fetchBedsData,
  harvestBeds,
  plantBeds,
} from "entities/Bed/model/thunks";
import { userSelector } from "entities/User";
import { tasksSelector } from "entities/Task";
import { completeTask, fetchTasksData } from "entities/Task/model/thunks";
import { TaskCard } from "shared/ui/TaskCard/TaskCard";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";
import {CustomGameModal, PlantModal, SurveyModal} from "features/FarmGame";
import {CropEnum} from "entities/Bed/model/types";
import {fetchUserData} from "entities/User/model/thunks";
import {
  PLANTS_VS_ZOMBIES_ORIGIN,
  PLANTS_VS_ZOMBIES_URL,
} from "shared/const/games";
import cls from "./FarmPage.module.scss";
import {FarmProductBadge} from "shared/ui/FarmProductBadge";
import {fetchInventory} from "entities/Inventory/model/thunks.ts";

interface BedPlant {
  crop: CropEnum;
  index: number;
}

interface Position {
  top?: number;
  left?: number;
}

export const FarmPage = () => {
  const dispatch = useAppDispatch();
  const beds: Bed[] = useSelector(bedsSelector);
  const tasks = useSelector(tasksSelector);
  const user = useSelector(userSelector);
  const [emptyFields, setEmptyFields] = useState<Set<HTMLElement>>(new Set());
  const [plantedFields, setPlantedFields] = useState<HTMLElement[]>([]);
  const [plantedBeds, setPlantedBeds] = useState<Bed[]>([]);

  useEffect(() => {
    dispatch(fetchBedsData());
    dispatch(fetchTasksData());
  }, [dispatch]);

  const plantActivity = useMemo(
    () =>
      beds?.some?.((bed) => {
        return (
          bed.crop === null ||
          Date.now() - new Date(bed.plantedAt).getTime() > 24 * 60 * 60 * 1000
        );
      }) ||
      tasks?.some((task) => !task.completedAt && task.task.type === "Plant"),
    [beds, tasks]
  );

  const surveyActivity = useMemo(
    () =>
      tasks?.some(
        (task) => !task.completedAt && task.task.type === "FinanceGenius"
      ),
    [tasks]
  );

  const getClickHandler = (bed: Bed) => () => {
    if (bed.plantedAt && user) {
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

  const [openedCustomGameModal, setOpenedCustomGameModal] =
    useState<boolean>(false);
  const [farmCardPosition, setFarmCardPosition] = useState<Position>({});

  useLayoutEffect(() => {
    const element = document.getElementById(`big_house`);

    if (element != null) {
      const position: DOMRect = element.getBoundingClientRect();
      setFarmCardPosition({
        top:
          position?.top ?? 0 + position?.height ?? 0 / 4 + window?.scrollY ?? 0,
        left:
          position?.left ?? 0 + position?.width ?? 0 / 4 + window?.scrollX ?? 0,
      });
    }

    const handleOpenCustomGame = () => {
      setOpenedCustomGameModal(true);
    };

    element?.addEventListener("click", handleOpenCustomGame);

    return () => {
      element?.removeEventListener("click", handleOpenCustomGame);
    };
  }, []);

  const handleCompleteTask = (type: string) => {
    const task = tasks?.find((task) => task?.task?.type === type);

    console.log("handleCompleteTask", type, task, tasks, user);

    if (task && user) {
      dispatch(completeTask(task.id))
        .unwrap()
        .then(() => {
          // Fetch balance
          dispatch(fetchUserData());
        });
    }
  };

  const handleCloseCustomGameModal = (
    actionName: "success" | "failed" | "close"
  ) => {
    if (actionName === "success") {
      handleCompleteTask("CustomGame");
    }
    setOpenedCustomGameModal(false);
  };

  const plantTask = useMemo(
    () => tasks.find((task) => task.task.type === "Plant"),
    [tasks]
  );

  const surveyTask = useMemo(
    () => tasks.find((task) => task.task.type === "FinanceGenius"),
    [tasks]
  );

  const [openedPlantModal, setOpenedPlantModal] = useState(false);
  const [bedIndex, setBedIndex] = useState<number>();

  const handleClosePlantModal = () => {
    setOpenedPlantModal(false);
  };

  const handleSubmitPlantModal = (bed: BedPlant) => {
    if (typeof bedIndex !== "number") {
      return;
    }

    const plantedBed = beds.find((item) => item.index === bed.index);

    if (plantedBed) {
      dispatch(
        plantBeds({
          bed: {
            ...plantedBed,
            crop: bed.crop,
          },
        })
      ).then(() => {
        dispatch(fetchBedsData());
        dispatch(fetchInventory());
      });
      handleCompleteTask("Plant");
    }
  };

  const [openedGeniusModal, setOpenedGeniusModal] = useState(true);

  const handleCloseGeniusModal = () => {
    setOpenedGeniusModal(false);
  };

  const handleSubmitGeniusModal = (success: boolean) => {
    if (success) {
      handleCompleteTask("FinanceGenius");
    }
    setOpenedGeniusModal(false);
  };

  return (
    <div className={cls.FarmPage}>
      {plantActivity && (
        <>
          <PlantModal
            onClose={handleClosePlantModal}
            onSubmit={handleSubmitPlantModal}
            opened={openedPlantModal}
            bedIndex={bedIndex!}
          />
          {Array.from(emptyFields).map((element) => {
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
          })}
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
      {farmCardPosition && (
        <>
          <div
            className={cls.task}
            style={farmCardPosition}
            onClick={() => {
              setOpenedCustomGameModal(true);
            }}
          >
            <TaskCard
              text="Спасти ферму от вредителей"
              coinsCount={"50"}
              className={cls.card}
            />
          </div>
        </>
      )}
      {surveyActivity && surveyTask && (
        <SurveyModal
          opened={openedGeniusModal}
          taskId={surveyTask?.task.id}
          onClose={handleCloseGeniusModal}
          onSubmit={handleSubmitGeniusModal}
        />
      )}
      <CustomGameModal
        opened={openedCustomGameModal}
        onClose={handleCloseCustomGameModal}
        url={PLANTS_VS_ZOMBIES_URL}
        origin={PLANTS_VS_ZOMBIES_ORIGIN}
      />
      <FarmMap />
    </div>
  );
};
