import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";

import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import {bedsSelector} from "entities/Bed";
import {fetchBedsData} from "entities/Bed/model/thunks";

import {animalBarnsSelector} from "entities/AnimalBarn";
import {fetchAnimalBarns} from "entities/AnimalBarn/model/thunks";
import {fetchTasksData} from "entities/Task/model/thunks";
import {tasksSelector} from "entities/Task";
import {currentTutorialPageSelector} from "entities/Tutorial/model/selectors.ts";
import {AppRoutes} from "shared/config/routeConfig/routeConfig.tsx";

export const useBedsController = () => {
  const dispatch = useAppDispatch();

  const beds = useSelector(bedsSelector);

  useEffect(() => {
    !beds && dispatch(fetchBedsData());
  }, [dispatch, beds]);

  return {
    beds,
  };
};

export const useBarnsController = () => {
  const dispatch = useAppDispatch();

  const animalBarns = useSelector(animalBarnsSelector);

  useEffect(() => {
    !animalBarns && dispatch(fetchAnimalBarns());
  }, [dispatch, animalBarns]);

  return {
    animalBarns,
  };
};

export const useTasksController = () => {
  const dispatch = useAppDispatch();

  const tasks = useSelector(tasksSelector);
  const beds = useSelector(bedsSelector);
  const currentTutorialPage = useSelector(currentTutorialPageSelector);

  useEffect(() => {
    !tasks && currentTutorialPage !== AppRoutes.MY_FARM && dispatch(fetchTasksData());
  }, [dispatch, tasks]);

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

  const plantTask = useMemo(
    () => tasks?.find((task) => task.task.type === "Plant"),
    [tasks],
  );

  const surveyTask = useMemo(
    () => tasks?.find((task) => task.task.type === "FinanceGenius"),
    [tasks],
  );

  return {
    tasks,
    plantActivity,
    surveyActivity,
    plantTask,
    surveyTask,
  };
};

interface CustomGameControllerProps {
  // TODO: define type
  onCompleteTask: (type: string) => void;
}

interface Position {
  top?: number;
  left?: number;
}

export const useCustomGameController = ({
  onCompleteTask,
}: CustomGameControllerProps) => {
  const [openedCustomGameModal, setOpenedCustomGameModal] =
    useState<boolean>(false);
  const [farmCardPosition, setFarmCardPosition] = useState<Position>({});

  const handleCloseCustomGameModal = (
    actionName: "success" | "failed" | "close"
  ) => {
    if (actionName === "success") {
      onCompleteTask("CustomGame");
    }
    setOpenedCustomGameModal(false);
  };

  const handleOpenCustomGameModal = () => {
    setOpenedCustomGameModal(true);
  };

  useLayoutEffect(() => {
    const element = document.getElementById(`house`);

    if (element != null) {
      const position: DOMRect = element.getBoundingClientRect();
      setFarmCardPosition({
        top:
          (position?.top ?? 0) +
          (position?.height ?? 0) / 2 +
          (window?.scrollY ?? 0),
        left:
          (position?.left ?? 0) +
          (position?.width ?? 0) / 2 +
          (window?.scrollX ?? 0),
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

  return {
    handleOpenCustomGameModal,
    handleCloseCustomGameModal,
    isOpenedCustomGameModal: openedCustomGameModal,
    farmCardPosition,
  };
};
