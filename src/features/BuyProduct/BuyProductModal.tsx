import {Modal} from "shared/ui/Modal/Modal";
import coinSound from "shared/assets/sounds/coins.mp3";
import useSound from "use-sound";
import CoinIcon from "shared/assets/icons/coins-32-32.svg?react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {purchaseProduct, sellProduct,} from "entities/Products/model/thunks";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {productsIsUpdatingSelector} from "entities/Products/model/selectors";
import {Product} from "entities/Products/model/types";
import BuyImage from "shared/assets/images/buy.png";
import cls from "./BuyProductModal.module.scss";
import {BackButton} from "shared/ui/BackButton/BackButton.tsx";
import {ModalButton, ModalButtonTheme} from "shared/ui/ModalButton/ModalButton.tsx";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  opened: boolean;
  isForSell?: boolean;
  product?: Product;
}

export const BuyProductModal = ({
  onClose,
  onSubmit,
  isForSell = false,
  opened,
  product,
}: Props) => {
  const dispatch = useAppDispatch();

  const isUpdating = useSelector(productsIsUpdatingSelector);
  const [isSuccess, setSuccess] = useState(false);
  const [play] = useSound(coinSound);

  useEffect(() => {
    setSuccess(false);
  }, [opened]);

  const onBuyProductsClick = async () => {
    await dispatch(purchaseProduct({ productId: product?.id || "" }));

    setSuccess(true);
    play();

    setTimeout(() => {
      onClose();
      onSubmit();
    }, 2_000);
  };

  const onSellProductsClick = async () => {
    await dispatch(sellProduct({ slotId: product?.id || "" }));
    setSuccess(true);
    play();

    setTimeout(() => {
      onClose();
      onSubmit();
    }, 2_000);
  };

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <BackButton className={cls['back-icon']} onClick={onClose}/>
          <p className={cls.title}>{isForSell ? 'Продажа' : 'Покупка'}</p>
        </div>

        <div className={cls.content}>
          <div className={cls['image-container']}>
            <img src={BuyImage} alt="buy" className={cls.img}/>
          </div>
          <p className={cls['main-text']}>
            {isForSell ? 'Вы продаете': 'Вы покупаете'} Луковицы цветов
          </p>
          <p className={cls.text}>
            {isForSell ? 'После продажи ваш баланс пополнится на:' : `После покупки с вашего балланса будет списано:`}
          </p>
          <div className={cls.price}>
            <CoinIcon className={cls["text-coin"]} /> {product?.price}
          </div>
        </div>

        {isSuccess && <CoinIcon className={cls.coin} />}

        <div className={cls.footer}>
          <ModalButton
              theme={ModalButtonTheme.OUTLINE}
              onClick={onClose}
              disabled={isUpdating}
          >
            Отмена
          </ModalButton>
          <ModalButton
            theme={ModalButtonTheme.BACKGROUND}
            onClick={isForSell ? onSellProductsClick : onBuyProductsClick}
            disabled={isUpdating}
          >
            {isForSell ? 'Продать' : 'Купить'}
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
};
