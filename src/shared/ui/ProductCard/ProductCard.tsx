import { memo } from 'react';
import classNames from "classnames";
import cls from "./ProductCard.module.scss";

interface ProductCardProps {
  className?: string;
  title?: string;
  description: string;
  additionalInfo?: string;
  icon?: string;
}

export const ProductCard = memo((props: ProductCardProps) => {
  const {className, title, description, additionalInfo, icon} = props;

  return (
    <div className={classNames(cls.ProductCard, {}, [className])}>
      <div className={cls["description-block"]}>
        {title && <h5>{title}</h5>}
        {description && <p className={cls.text}>{description}</p>}
        {!!additionalInfo && (
          <p className={cls.additionalInfo}>{additionalInfo}</p>
        )}
      </div>
      <div className={cls.header}>
        {icon && <img className={cls.icon} src={icon} />}
      </div>
    </div>
  );
});
