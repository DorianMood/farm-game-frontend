import FarmMap from "shared/assets/images/farm/map.svg?react";
import { useSelector } from "react-redux";
import { Bed, bedsSelector } from "entities/Bed";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
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
import { CustomGameModal, PlantModal, SurveyModal } from "features/FarmGame";
import { CropEnum } from "entities/Bed/model/types";
import { fetchUserData } from "entities/User/model/thunks";
import {
  PLANTS_VS_ZOMBIES_ORIGIN,
  PLANTS_VS_ZOMBIES_URL,
} from "shared/const/games";
import cls from "./FarmPage.module.scss";
import {Task} from "../../../entities/Task/model/types";

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

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserData());
    }
  }, [dispatch, user]);

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
    [beds, tasks],
  );

  const surveyActivity = useMemo(
    () =>
      tasks?.some(
        (task) => !task.completedAt && task.task.type === "FinanceGenius",
      ),
    [tasks],
  );

  const getClickHandler = (bed: Bed) => () => {
    if (bed.plantedAt && user) {
      dispatch(
        harvestBeds({
          index: bed.index,
        }),
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

    const listeners: ((event: MouseEvent) => void)[] = [];
    for (let i = 0; i < beds.length; i++) {
      const element = document.getElementById(`bed-${beds[i].index}`);
      element?.setAttribute("class", "");
      if (!beds[i].crop) {
        element && emptyFields.add(element);
      } else {
        element?.classList.add(
          beds[i].crop !== null &&
            Date.now() - new Date(beds[i].plantedAt).getTime() >
              24 * 60 * 60 * 1000
            ? cls[beds[i].crop.toLowerCase()]
            : cls.field,
        );
      }
      listeners.push(getClickHandler(beds[i]));
      element?.addEventListener("click", listeners[i]);
    }

    setEmptyFields(emptyFields);

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

  const handleCloseCustomGameModal = (
    actionName: "success" | "failed" | "close",
  ) => {
    console.log("close modal", actionName);

    if (actionName === "success") {
      handleCompleteTask("CustomGame", tasks);
    }
    setOpenedCustomGameModal(false);
  };

  useEffect(() => {
    console.log('tasks monitoring', tasks)
  }, [tasks])

  const handleCompleteTask = useCallback(
    (type: string, tasks: Task[]) => {
      console.log('type', type);
      console.log('tasks из аргументов функции', tasks);

      const task = tasks?.find((task) => task?.task?.type === type);

      console.log('task', task);

      if (task && user) {
        dispatch(completeTask(task.id))
          .unwrap()
          .then(() => {
            // Fetch balance
            dispatch(fetchUserData());
          });
      }
    },
    [dispatch, user],
  );

  const plantTask = useMemo(
    () => tasks.find((task) => task.task.type === "Plant"),
    [tasks],
  );

  const surveyTask = useMemo(
    () => tasks.find((task) => task.task.type === "FinanceGenius"),
    [tasks],
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
        }),
      ).then(() => {
        dispatch(fetchBedsData());
      });
      // TODO: завершить таск
      handleCompleteTask("Plant", tasks);
    }
  };

  const [openedGeniusModal, setOpenedGeniusModal] = useState(true);

  const handleCloseGeniusModal = () => {
    setOpenedGeniusModal(false);
  };

  const handleSubmitGeniusModal = (success: boolean) => {
    if (success) {
      handleCompleteTask("FinanceGenius", tasks);
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
                  top: position.top + position.height / 4 + window.scrollY,
                  left: position.left + position.width / 4 + window.scrollX,
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
