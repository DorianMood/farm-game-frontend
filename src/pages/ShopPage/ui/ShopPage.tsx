import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import { ShopCard } from "shared/ui/ShopCard/ShopCard";
import { Heading } from "shared/ui/Heading/Heading";
import { fetchProductsData, sellProduct } from "entities/Products/model/thunks";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import { productsSelector } from "entities/Products";
import { BuyProductModal } from "features/BuyProduct/BuyProductModal";
import cls from "./ShopPage.module.scss";
import { inventorySelector } from "entities/Inventory";
import { InventoryCard } from "shared/ui/InventoryCard/InventoryCard.tsx";
import { fetchInventory } from "entities/Inventory/model/thunks";

interface ShopPageProps {
  className?: string;
}

export const ShopPage = ({ className }: ShopPageProps) => {
  const dispatch = useAppDispatch();

  const [activeTabName, setActiveTabName] = useState("all");
  const [productId, setProductId] = useState("");

  const products = useSelector(productsSelector);

  const handleClickShopCard = (productId: string) => {
    setProductId(productId);
  };
  const handleCloseBuyProductModal = () => {
    setProductId("");
  };

  const handleSubmitBuyProduct = () => {
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
          onSellClick={() => {
            dispatch(sellProduct({ slotId: item.id })).then(() => {
              dispatch(fetchProductsData({ filter: "all" }));
              dispatch(fetchInventory());
            });
          }}
          key={`${item.inventoryItem.id}`}
          text={item?.inventoryItem.name}
          coinsCount={item.inventoryItem.price}
          itemsCount={item.amount}
        />
      )),
    [dispatch, inventory],
  );

  const productList = useMemo(
    () =>
      products?.items?.map((item) => (
        <ShopCard
          key={`${item?.id}`}
          text={item?.name}
          coinsCount={item.price}
          onClick={() => handleClickShopCard(item.id)}
        />
      )),
    [products],
  );

  return (
    <>
      <BuyProductModal
        onClose={handleCloseBuyProductModal}
        onSubmit={handleSubmitBuyProduct}
        opened={!!productId}
        product={products?.items?.find((item) => item.id === productId)}
      />
      <div className={classNames(cls.Shop, {}, [className])}>
        <Heading level={1} className={cls.shopHeading}>
          Магазин
        </Heading>
        <div className={cls["inventory-container"]}>
          <Heading level={4}>К ПОКУПКЕ</Heading>
          <div className={cls["inventory"]}>{productList}</div>
        </div>
        <div className={cls["inventory-container"]}>
          <Heading level={4}>К ПРОДАЖЕ</Heading>
          <div className={cls["inventory"]}>{inventoryList}</div>
        </div>
      </div>
    </>
  );
};
