import cls from "./BackButton.module.scss";
import Back from "shared/assets/icons/back-24-24.svg?react";
import classNames from "classnames";

interface BackButtonProps {
  className?: string;
  onClick: () => void;
}

export const BackButton = ({className, onClick}: BackButtonProps) => {
  return (
      <div className={classNames(cls.BackButton, {}, [className])} onClick={onClick}>
        <Back/>
      </div>
  );
};
