import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tasksSelector } from "entities/Task";
import classNames from "classnames";
import FarmerGirl from "shared/assets/images/farmer-girl.png";
import { MessageCard } from "shared/ui/MessageCard/MessageCard";
import cls from "./TaskReminder.module.scss";

interface TaskReminderProps {
  className?: string;
}

export const TaskReminder = ({ className }: TaskReminderProps) => {
  const tasks = useSelector(tasksSelector);

  const [isVisible, setVisible] = useState(true);

  const handleCloseClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (tasks?.length === 0) {
      setVisible(false);
    }
  }, [tasks]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cls["game-bottom"]}>
      <div className={classNames(cls.TaskReminder, {}, [className])}>
        <MessageCard
          text={`Добро пожаловать обратно! Сегодня у нас на ферме ${tasks?.length} новых заданий!`}
          onClose={handleCloseClick}
        />
        <img src={FarmerGirl} alt="farmer-girl-helper" />
      </div>
    </div>
  );
};
