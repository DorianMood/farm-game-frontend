import cls from "../FarmPage.module.scss";
import { TaskCard } from "shared/ui/TaskCard/TaskCard.tsx";
import { CustomGameModal } from "features/FarmGame";
import {
  PLANTS_VS_ZOMBIES_ORIGIN,
  PLANTS_VS_ZOMBIES_URL,
} from "shared/const/games.ts";
import { useCustomGameController } from "./hooks.tsx";
import { useSelector } from "react-redux";
import { tasksSelector } from "entities/Task";
import { tasksIsLoadingSelector } from "entities/Task/model/selectors.ts";

interface CustomGameProps {
  onCompleteTask: (type: string) => void;
}

export const CustomGame = ({ onCompleteTask }: CustomGameProps) => {
  const tasks = useSelector(tasksSelector);
  const isLoadingTasks = useSelector(tasksIsLoadingSelector);

  const customGame = tasks?.find((task) => task.task.type === "CustomGame");

  const {
    handleOpenCustomGameModal,
    handleCloseCustomGameModal,
    isOpenedCustomGameModal,
    farmCardPosition,
  } = useCustomGameController({ onCompleteTask });

  if (isLoadingTasks) {
    return null;
  }

  if (!customGame) {
    return (
      farmCardPosition && (
        <div
          className={cls.task}
          style={{
            position: "absolute",
            ...farmCardPosition,
            transform: "translateX(-50%) translateY(-100%)",
          }}
        >
          <TaskCard text="Задание появится позже..." className={cls.card} />
        </div>
      )
    );
  }

  return (
    <>
      {farmCardPosition && (
        <div
          className={cls.task}
          style={{
            position: "absolute",
            ...farmCardPosition,
            transform: "translateX(-50%) translateY(-100%)",
          }}
          onClick={handleOpenCustomGameModal}
        >
          <TaskCard
            text="Спасти ферму от вредителей"
            coinsCount={String(customGame.task.cost)}
            className={cls.card}
          />
        </div>
      )}
      <CustomGameModal
        opened={isOpenedCustomGameModal}
        onClose={handleCloseCustomGameModal}
        url={PLANTS_VS_ZOMBIES_URL}
        origin={PLANTS_VS_ZOMBIES_ORIGIN}
      />
    </>
  );
};

