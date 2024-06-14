import { Modal } from "shared/ui/Modal/Modal";
import coinSound from "shared/assets/sounds/coins.mp3";
import useSound from "use-sound";
import CoinIcon from "shared/assets/icons/coin-16-16.svg?react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  purchaseProduct,
  //updateProductsData,
} from "entities/Products/model/thunks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productsIsUpdatingSelector } from "entities/Products/model/selectors";
import { Product } from "entities/Products/model/types";
import BuyImage from "shared/assets/images/buy.png";
import cls from "./BuyProductModal.module.scss";

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  opened: boolean;
  product?: Product;
}

export const BuyProductModal = ({
  onClose,
  onSubmit,
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

    // dispatch(
    //   updateProductsData({
    //     productId: product?.id || "",
    //   }),
    // );

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
          <p>Покупка</p>
        </div>

        <div className={cls.content}>
          <img src={BuyImage} alt="buy" className={cls.img} />
          <p className={cls.text}>
            Вы уверены, что хотите приобрести данный товар?
          </p>
          <p className={cls.text}>
            {" "}
            {`После покупки с вас спишется   ${product?.price} `}{" "}
            {!isSuccess && <CoinIcon className={cls["text-coin"]} />}
          </p>
        </div>

        {isSuccess && <CoinIcon className={cls.coin} />}

        <div className={cls.footer}>
          <Button
            theme={ButtonTheme.BACKGROUND_INVERTED}
            className={cls.loginBtn}
            onClick={onBuyProductsClick}
            disabled={isUpdating}
          >
            Купить
          </Button>

          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.loginBtn}
            onClick={onClose}
            disabled={isUpdating}
          >
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};
