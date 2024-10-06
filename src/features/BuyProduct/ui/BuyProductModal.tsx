import { Modal } from "shared/ui/Modal/Modal.tsx";
import coinSound from "shared/assets/sounds/coins.mp3";
import useSound from "use-sound";
import CoinIcon from "shared/assets/icons/coins-32-32.svg?react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {
  purchaseProduct,
  sellProduct,
} from "entities/Products/model/thunks.ts";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { productsIsUpdatingSelector } from "entities/Products/model/selectors.ts";
import { Product } from "entities/Products/model/types.ts";
import BuyImage from "shared/assets/images/buy.png";
import cls from "./BuyProductModal.module.scss";
import { BackButton } from "shared/ui/BackButton/BackButton.tsx";
import {
  ModalButton,
  ModalButtonTheme,
} from "shared/ui/ModalButton/ModalButton.tsx";
import { getProductData } from "../utils.ts";
import {ProductsCounter} from "../../../shared/ui/ProductsCounter/ProductsCounter.tsx";
import {userSelector} from "../../../entities/User";

interface BuyProductModalProps {
  onClose: () => void;
  onSubmit: () => void;
  opened: boolean;
  isForSell?: boolean;
  product?: Product;
  slotId?: string;
  inventoryItemsCount: number;
}

export const BuyProductModal = ({
  onClose,
  onSubmit,
  isForSell = false,
  opened,
  product,
  slotId,
  inventoryItemsCount,
}: BuyProductModalProps) => {
  const dispatch = useAppDispatch();

  const [productsCounter, setProductsCounter] = useState(1);

  const user = useSelector(userSelector);

  const isUpdating = useSelector(productsIsUpdatingSelector);
  const [isSuccess, setSuccess] = useState(false);
  const [play] = useSound(coinSound);

  useEffect(() => {
    setSuccess(false);
  }, [opened]);

  const onBuyProductsClick = async () => {
    await dispatch(purchaseProduct({ productId: product?.id || "", amount: productsCounter }));

    setSuccess(true);
    play();

    setTimeout(() => {
      onClose();
      onSubmit();
    }, 1_000);
  };

  const onSellProductsClick = async () => {
    await dispatch(sellProduct({ slotId: slotId || "", amount: productsCounter }));
    setSuccess(true);
    play();

    setTimeout(() => {
      onClose();
      onSubmit();
    }, 1_000);
  };

  const productData = useMemo(() => {
    return getProductData(product);
  }, [product]);

  const maxProductCount = useMemo(() => {
    if (isForSell) {
      return inventoryItemsCount
    }

    return Math.floor((user?.ballance ?? 0) / (product?.price ?? 1));
  }, [isForSell, user?.ballance, product?.price, inventoryItemsCount])

  return (
    <Modal isOpen={opened} className={cls.modal}>
      <div className={cls.root}>
        <div className={cls.header}>
          <BackButton className={cls["back-icon"]} onClick={onClose} />
          <p className={cls.title}>{isForSell ? "Продажа" : "Покупка"}</p>
        </div>

        <div className={cls.content}>
          <div
            className={cls["image-container"]}
            style={{ background: productData?.background ?? "" }}
          >
            <img
              src={productData?.image ?? BuyImage}
              alt="buy"
              className={cls.img}
            />
          </div>
          <p className={cls["main-text"]}>
            {isForSell ? "Вы продаете" : "Вы покупаете"}{" "}
            {productData?.nameForBuyOrSell}
          </p>
          <ProductsCounter
              maxProductCount={maxProductCount}
              onChange={(value) => setProductsCounter(value)}
          />
          <p className={cls.text}>
            {isForSell
              ? "После продажи ваш баланс пополнится на:"
              : `После покупки с вашего балланса будет списано:`}
          </p>
          <div className={cls.price}>
            <CoinIcon className={cls["text-coin"]} /> {
            isForSell
              ? ((product?.price ?? 0) * (product?.sellMultiplier ?? 0) * productsCounter)
              : (product?.price ?? 0) * productsCounter
          }
          </div>
        </div>

        {isSuccess && <CoinIcon className={cls.coin} />}

        <div className={cls.footer}>
          <ModalButton
            theme={ModalButtonTheme.OUTLINE}
            onClick={onClose}
            disabled={isUpdating || isSuccess}
          >
            Отмена
          </ModalButton>
          <ModalButton
            theme={ModalButtonTheme.BACKGROUND}
            onClick={isForSell ? onSellProductsClick : onBuyProductsClick}
            disabled={isUpdating || isSuccess}
          >
            {isForSell ? "Продать" : "Купить"}
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
};
