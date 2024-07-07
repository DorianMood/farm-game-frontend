import { memo } from 'react';
import classNames from "classnames";
import {TextTheme} from "../Text/Text.tsx";
import {Text} from "shared/ui/Text/Text";
import cls from './ProductCard.module.scss';

interface ProductCardProps {
    className?: string;
    title?: string;
    description: string;
    additionalInfo?: string;
    icon?: string;
}

export const ProductCard = memo((props: ProductCardProps) => {
    const {
        className,
        title,
        description,
        additionalInfo,
        icon
    } = props;

    return (
        <div className={classNames(cls.ProductCard, {}, [className])}>
            <div className={cls.header}>
                {icon && <img className={cls.icon} src={icon}/>}
                {title && <Text text={title} theme={TextTheme.PRIMARY}/>}
            </div>
            <div className={cls['description-block']}>
                {description && <p className={cls.text}>{description}</p>}
                {!!additionalInfo && <p className={cls.additionalInfo}>{additionalInfo}</p>}
            </div>
        </div>
    );
});
