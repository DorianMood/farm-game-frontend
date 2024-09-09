import { memo } from 'react';
import classNames from "classnames";
import cls from "./ProductCard.module.scss";


interface ProductCardProps {
  className?: string;
  title?: string;
  description: string;
  additionalInfo?: string;
  background?: string;
  image?: string;
  icon?: string;
}

export const ProductCard = memo((props: ProductCardProps) => {
  const {className, title, background, description, additionalInfo, image} = props;

  return (
    <div style={{background: background}} className={classNames(cls.ProductCard, {}, [className])}>
      <div className={cls["description-block"]}>
        {title && <h3 className={cls.title}>{title}</h3>}
        {description && <p className={cls.text}>{description}</p>}
        {!!additionalInfo && (
          <p className={cls.additionalInfo}>{additionalInfo}</p>
        )}
      </div>
        {image && <img className={cls.icon} src={image} />}
    </div>
  );
});
