import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

import {
  Point,
  TouchGesture,
  WheelGesture,
  applyMatrix,
  gestureToMatrix,
  getOrigin,
  okzoomer,
} from "shared/lib/zoom";

import { bedsSelector } from "entities/Bed";
import { fetchBedsData } from "entities/Bed/model/thunks";

import { animalBarnsSelector } from "entities/AnimalBarn";
import { fetchAnimalBarns } from "entities/AnimalBarn/model/thunks";
import { fetchTasksData } from "entities/Task/model/thunks";
import { tasksSelector } from "entities/Task";
import { currentTutorialPageSelector } from "entities/Tutorial/model/selectors.ts";
import { AppRoutes } from "shared/config/routeConfig/routeConfig.tsx";
//import {isLoadingAnimalBarnsSelector} from "../../../../entities/AnimalBarn/model/selectors.ts";
//import {isLoadingBedsSelector} from "../../../../entities/Bed/model/selectors.ts";
import { tasksIsLoadingSelector } from "../../../../entities/Task/model/selectors.ts";

export const useBedsController = () => {
  const dispatch = useAppDispatch();

  const beds = useSelector(bedsSelector);
  //const isLoadingBeds = useSelector(isLoadingBedsSelector);

  useEffect(() => {
    !beds && /*!isLoadingBeds &&*/ dispatch(fetchBedsData());
  }, [dispatch, beds /*, isLoadingBeds*/]);

  return {
    beds,
  };
};

export const useBarnsController = () => {
  const dispatch = useAppDispatch();

  const animalBarns = useSelector(animalBarnsSelector);
  //const isLoadingAnimalBarns = useSelector(isLoadingAnimalBarnsSelector);

  useEffect(() => {
    !animalBarns && /*!isLoadingAnimalBarns &&*/ dispatch(fetchAnimalBarns());
  }, [dispatch, animalBarns /*, isLoadingAnimalBarns*/]);

  return {
    animalBarns,
  };
};

export const useTasksController = () => {
  const dispatch = useAppDispatch();

  const tasks = useSelector(tasksSelector);
  const isLoadingTasks = useSelector(tasksIsLoadingSelector);
  const beds = useSelector(bedsSelector);
  const currentTutorialPage = useSelector(currentTutorialPageSelector);

  useEffect(() => {
    !tasks &&
      !isLoadingTasks &&
      currentTutorialPage !== AppRoutes.MY_FARM &&
      dispatch(fetchTasksData());
  }, [dispatch, tasks, isLoadingTasks]);

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
    actionName: "success" | "failed" | "close",
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

export const useMapZoom = (ref: React.RefObject<HTMLDivElement>) => {
  useLayoutEffect(() => {
    // subscribe on zoom and apply zoom on map
    // unsubscribe and cleanup zoom event
    if (!ref.current) {
      return;
    }

    let origin: Point;
    let initial_ctm = new DOMMatrix();
    let el = ref.current;
    el.style.transformOrigin = "0 0";

    const rect = el.getBoundingClientRect();

    const maxScale = Math.min(
      rect.height / window.innerHeight,
      rect.width / window.innerWidth,
    );

    /*
				Extract the uniform scale component from a DOMMatrix.

				The code is simple because we build the DOMMatrix objects
				ourselves and we don't ever apply a non-uniform scale
				or a skew to the object.

				The general algorithm to extract individual components 
				from a CSS matrix can be found here:

				https://drafts.csswg.org/css-transforms/#decomposing-a-2d-matrix
			 */
    function getScaleFromMatrix(m: DOMMatrix) {
      return Math.hypot(m.a, m.b);
    }

    /*
				Given the element's current transform matrix `m`
				adjust the `gesture` object so that when applied 
				to the element, the element's scale does not go 
				under 0.5%, nor over 200%.
			 */
    function clampScale(gesture: WheelGesture | TouchGesture, m: DOMMatrix) {
      let s = getScaleFromMatrix(m);
      let proposed_scale = gesture.scale * s;

      if (proposed_scale > maxScale || proposed_scale < 0.5) {
        return {
          ...gesture,
          scale: Math.max(0.5, Math.min(2, proposed_scale)) / s,
        };
      }
      return gesture;
    }

    function getTranslationFromMatrix(m: DOMMatrix) {
      return {
        x: m.e,
        y: m.f,
      };
    }
    /*
				Given the element's current transform matrix `m`
				adjust the `gesture` object so that when applied 
				to the element, the element's translation does not go 
				under {0, 0}, nor over {100%, 100%}.
			 */
    function clampTranslation(
      gesture: WheelGesture | TouchGesture,
      m: DOMMatrix,
    ) {
      let t = getTranslationFromMatrix(m);
      let proposed_position = {
        x: gesture.translation.x + t.x,
        y: gesture.translation.y + t.y,
      };

      const rect = el.getBoundingClientRect();

      const maxXOffset = window.innerWidth - (rect?.width ?? 0);
      const maxYOffset = window.innerHeight - (rect?.height ?? 0);

      return {
        ...gesture,
        translation: {
          x:
            proposed_position.x > 0
              ? gesture.translation.x - proposed_position.x
              : proposed_position.x < maxXOffset
                ? gesture.translation.x - (proposed_position.x - maxXOffset)
                : gesture.translation.x,
          y:
            proposed_position.y > 0
              ? gesture.translation.y - proposed_position.y
              : proposed_position.y < maxYOffset
                ? gesture.translation.y - (proposed_position.y - maxYOffset)
                : gesture.translation.y,
        },
      };
    }

    okzoomer(ref.current, {
      startGesture: (gesture) => {
        /*
						Clear the element's transform so we can 
						measure its original position wrt. the screen.

						(We don't need to restore it because it gets 
						overwritten by `applyMatrix()` anyways.)
					 */
        el.style.transform = "";
        gesture = clampScale(gesture, initial_ctm);
        // origin = getOrigin(el, gesture);
        // const scaled_ctm = gestureToMatrix(gesture, origin).multiply(
        //   initial_ctm,
        // );
        //console.log(scaled_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        origin = getOrigin(el, gesture);
        const ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        applyMatrix(el, ctm);
      },
      doGesture: (gesture) => {
        gesture = clampScale(gesture, initial_ctm);
        // const scaled_ctm = gestureToMatrix(gesture, origin).multiply(
        //   initial_ctm,
        // );
        //console.log(scaled_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        // const clampedGesture = clampTranslation(gesture, scaled_ctm);
        // const translated_ctm = gestureToMatrix(clampedGesture, origin);
        // console.log(
        //   scaled_ctm,
        //   translated_ctm,
        //   translated_ctm.multiply(initial_ctm),
        // );
        const ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        applyMatrix(el, ctm);
      },
      endGesture: (gesture) => {
        gesture = clampScale(gesture, initial_ctm);
        // const scaled_ctm = gestureToMatrix(gesture, origin).multiply(
        //   initial_ctm,
        // );
        // console.log(scaled_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        initial_ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        // console.log(initial_ctm, initial_ctm.toString());
        applyMatrix(el, initial_ctm);
      },
    });
  }, []);
};
