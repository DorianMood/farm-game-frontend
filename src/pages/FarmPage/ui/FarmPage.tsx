import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {fetchBedsData, harvestBeds, plantBeds,} from "entities/Bed/model/thunks";
import {userSelector} from "entities/User";
import {completeTask, fetchTasksData} from "entities/Task/model/thunks";
import {PlantModal, SurveyModal} from "features/FarmGame";
import {fetchUserData} from "entities/User/model/thunks";
import cls from "./FarmPage.module.scss";
import {useTasksController} from "./Map/hooks";
import {Map} from "./Map/Map";
import {fetchInventory} from "entities/Inventory/model/thunks";
import {bedsSelector} from "entities/Bed";
import {SeedEnum} from "entities/Inventory/model/types.ts";
import {currentTutorialPageSelector} from "entities/Tutorial/model/selectors.ts";
import {fetchAnimalBarns} from "entities/AnimalBarn/model/thunks.ts";
import {tasksActions} from "entities/Task";

interface BedPlant {
  seed: SeedEnum;
  index: number;
}

export const FarmPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const beds = useSelector(bedsSelector);
  const currentTutorialPage = useSelector(currentTutorialPageSelector);

  useEffect(() => {
    dispatch(fetchTasksData());
    dispatch(fetchInventory());
    dispatch(fetchBedsData());
    dispatch(fetchUserData());
    dispatch(fetchAnimalBarns());
  }, [dispatch, currentTutorialPage])

  const { tasks, plantActivity, surveyActivity, surveyTask } =
    useTasksController();

  const handleCompleteTask = (type: string) => {
    const task = tasks?.find((task) => task?.task?.type === type);

    if (task && user) {
      dispatch(completeTask(task.id))
        .unwrap()
        .then(() => {
          // Fetch balance
          dispatch(fetchUserData());
        });
    }
  };

  const [openedPlantModal, setOpenedPlantModal] = useState(false);
  const [bedIndex, setBedIndex] = useState<number>();

  const handleOpenPlantModal = (bedIndex: number) => {
    setBedIndex(bedIndex);
    setOpenedPlantModal(true);
  };

  const handleClosePlantModal = () => {
    setOpenedPlantModal(false);
  };

  const handleSubmitPlantModal = (bed: BedPlant) => {
    if (typeof bedIndex !== "number") {
      return;
    }

    const plantedBed = beds?.find((item) => item.index === bed.index);

    if (plantedBed) {
      dispatch(
        plantBeds({
          index: bed.index,
          crop: bed.seed,
        }),
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
    dispatch(tasksActions.resetFinanceGeniusData())
  };

  const handleSubmitGeniusModal = (success: boolean) => {
    if (success) {
      handleCompleteTask("FinanceGenius");
    }
    setOpenedGeniusModal(false);
    dispatch(tasksActions.resetFinanceGeniusData())
  };

  const handleHarvestBed = (bedIndex: number) => {
    dispatch(harvestBeds({index: bedIndex})).then(() => {
      dispatch(fetchBedsData());
      dispatch(fetchInventory());
    });
  };

  const handleHarvestBarn = (barnIndex: number) => {
    console.log(`Harvest ${barnIndex}`);
  };

  return (
    <div className={cls.FarmPage}>
      {plantActivity && (
        <PlantModal
          onClose={handleClosePlantModal}
          onSubmit={handleSubmitPlantModal}
          opened={openedPlantModal}
          bedIndex={bedIndex!}
        />
      )}
      {surveyActivity && surveyTask && (
        <SurveyModal
          opened={openedGeniusModal}
          taskId={surveyTask?.task.id}
          onClose={handleCloseGeniusModal}
          onSubmit={handleSubmitGeniusModal}
        />
      )}
      <Map
        onPlantBed={handleOpenPlantModal}
        onHarvestBed={handleHarvestBed}
        onHarvestAnimal={handleHarvestBarn}
        onCompleteTask={handleCompleteTask}
      />
    </div>
  );
};
