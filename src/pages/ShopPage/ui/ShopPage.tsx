import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { ShopCard } from "shared/ui/ShopCard/ShopCard";
import { Heading } from "shared/ui/Heading/Heading";
import { fetchProductsData } from "entities/Products/model/thunks";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { productsSelector } from "entities/Products";
import { BuyProductModal } from "features/BuyProduct";
import cls from "./ShopPage.module.scss";
import { inventorySelector } from "entities/Inventory";
import { InventoryCard } from "shared/ui/InventoryCard/InventoryCard.tsx";
import { fetchInventory } from "entities/Inventory/model/thunks";
import {getProductData} from "features/BuyProduct/utils.ts";

interface ShopPageProps {
  className?: string;
}

export const ShopPage = ({ className }: ShopPageProps) => {
  const dispatch = useAppDispatch();

  const [activeTabName, setActiveTabName] = useState("all");
  const [productId, setProductId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [isForSell, setForSell] = useState(false);

  const products = useSelector(productsSelector);

  const handleClickShopCard = (productId: string, isForSell: boolean) => {
    setProductId(productId);
    setForSell(isForSell);
  };

  const handleCloseBuyProductModal = () => {
    setProductId("");
    setSlotId("");
  };

  const handleSubmitClickProduct = () => {
    dispatch(fetchProductsData({ filter: "all" }));
    dispatch(fetchInventory());
    setActiveTabName("all");
  };

  useEffect(() => {
    dispatch(fetchProductsData({ filter: activeTabName }));
  }, [dispatch, activeTabName]);

  const inventory = useSelector(inventorySelector);

  const inventoryList = useMemo(
    () =>
      inventory?.items?.map((item) => (
        <InventoryCard
          image={getProductData(item?.inventoryItem)?.smallImage}
          key={`${item.inventoryItem.id}`}
          title={item?.inventoryItem.name}
          description={item?.inventoryItem?.description}
          coinsCount={item.inventoryItem.price}
          itemsCount={item.amount}
          onClick={() => {
            handleClickShopCard(item.inventoryItem.id, true);
            setSlotId(item.id);
          }}
        />
      )),
    [inventory],
  );

  const productList = useMemo(
    () =>
      products?.items?.map((item) => {
        return (
          <ShopCard
            image={getProductData(item)?.smallImage}
            key={`${item?.id}`}
            title={item.name}
            background={getProductData(item)?.background}
            description={item.description}
            coinsCount={item.price}
            onClick={() => handleClickShopCard(item.id, false)}
          />
        );
      }),
    [products],
  );

  return (
    <>
      <BuyProductModal
        isForSell={isForSell}
        onClose={handleCloseBuyProductModal}
        onSubmit={handleSubmitClickProduct}
        opened={!!productId}
        slotId={slotId}
        product={products?.items?.find((item) => item.id === productId)}
      />
      <div className={classNames(cls.Shop, {}, [className])}>
        <Heading level={1} className={cls.shopHeading}>
          Магазин
        </Heading>
          {!!productList?.length && <div className={cls["inventory-container"]}>
          <Heading level={4}>Можно купить</Heading>
          <div className={cls["inventory"]}>{productList}</div>
        </div>}
          {!!inventoryList?.length && <div className={cls["inventory-container"]}>
          <Heading level={4}>Можно продать</Heading>
          <div className={cls["inventory"]}>{inventoryList}</div>
        </div>}
      </div>
    </>
  );
};
