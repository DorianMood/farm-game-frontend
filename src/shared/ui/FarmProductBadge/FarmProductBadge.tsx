import { ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";

import styles from "./FarmProductBadge.module.scss";
import {formatDate} from "../../../features/FarmGame/PlantModal/utilts.ts";

interface FarmProductBadgeProps {
  icon: ReactNode;
  /**
   * Timestamp when the product starts.
   */
  startTime: number;
  /**
   * Timestamp when the product ends.
   */
  endTime: number;
  onHarvest: () => void;
  className?: string;
}

export const FarmProductBadge = ({
  icon,
  startTime,
  endTime,
  onHarvest,
  className,
}: FarmProductBadgeProps) => {
  const [isHarvestAvailable, setIsHarvestAvailable] = useState(endTime - Date.now() < 0);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      const progress = Math.ceil(
        ((now - startTime) / (endTime - startTime)) * 100,
      );

      rootRef.current?.style.setProperty("--progress", `${progress}%`);

      if (progress > 99) {
        setIsHarvestAvailable(true);
        clearInterval(t);
      } else {
        setIsHarvestAvailable(false);
      }
    }, 1_000 / 60);

    return () => clearInterval(t);
  }, [startTime, endTime]);

  const handleHarvestClick = () => {
    if (isHarvestAvailable) {
      onHarvest();
    } else {
      // TODO: notification
      console.log("Not ready yet");
    }
  };

  return (
    <button
      onClick={handleHarvestClick}
      className={cn(styles.root, className, {
        [styles.bounce]: isHarvestAvailable,
      })}
    >
      {icon}
      {!isHarvestAvailable && <div className={styles['progress-bar']}>
        <div ref={rootRef} className={styles['progress-bar-fill']}>
        </div>
        <p className={styles['text']}>Общее время: <b>{formatDate(endTime - startTime)}</b></p>
      </div>}
    </button>
  );
};
