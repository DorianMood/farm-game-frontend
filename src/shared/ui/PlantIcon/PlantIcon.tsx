import {ReactNode} from "react";
import cn from "classnames";
import cls from "./PlantIcon.module.scss";

interface PlantIconProps {
  icon: ReactNode;
  className?: string;
}

export const PlantIcon = ({icon, className}: PlantIconProps) => {
  return <div className={cn(cls.root, className)}>{icon}</div>;
};
