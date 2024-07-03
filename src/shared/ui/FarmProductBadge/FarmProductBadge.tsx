import { ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";

import styles from "./FarmProductBadge.module.scss";

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
  const [isHarvestAvailable, setIsHarvestAvailable] = useState(false);

  const rootRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      const progress = Math.ceil(
        ((now - startTime) / (endTime - startTime)) * 100,
      );

      if (progress <= 100) {
        rootRef.current?.style.setProperty("--progress", `${progress}%`);
      } else {
        clearInterval(t);
        setIsHarvestAvailable(true);
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
      ref={rootRef}
    >
      {icon}
    </button>
  );
};
