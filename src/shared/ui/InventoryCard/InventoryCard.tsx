import classNames from "classnames";
import {memo} from "react";
import cls from "./InventoryCard.module.scss";
import {ModalButton, ModalButtonTheme} from "../ModalButton/ModalButton.tsx";

interface InventoryCardProps {
    image?: string;
    className?: string;
    title?: string;
    description?: string;
    background?: string;
    coinsCount?: number;
    itemsCount?: number;
    href?: string;
    onClick: () => void;
}

export const InventoryCard = memo((props: InventoryCardProps) => {
    const {title, description, itemsCount, background, coinsCount, href, image, onClick} = props;

    return (
        <div className={cls.root}>
            <div
                className={classNames(cls.InventoryCard, {[cls.active]: !!href})}
                style={{background: background}}
            >
                <div className={cls.info}>
                    {title && <h3 className={cls.title}>{title}</h3>}
                    {description && <p className={cls.description}>{description}</p>}
                    {coinsCount && (
                        <div className={cls.coinsCount}>
                            <p className={cls.coinsCountText}>Цена {coinsCount} монет</p>
                            <p>Доступно к продаже {itemsCount} шт.</p>
                        </div>
                    )}
                    <ModalButton
                        theme={ModalButtonTheme.BACKGROUND}
                        onClick={onClick}
                        className={cls.button}
                    >
                        Продать
                    </ModalButton>
                    <img className={cls.img} src={image ?? 'https://placehold.co/600x400'}/>
                </div>
            </div>
        </div>
    );
});
