import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {ShopCard} from "shared/ui/ShopCard/ShopCard";
import {Heading} from "shared/ui/Heading/Heading";
import {Tabs} from "shared/ui/Tabs/Tabs";
import {Tab} from "shared/ui/Tabs/components/tab";
import {fetchProductsData} from "entities/Products/model/thunks";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {productsSelector} from "entities/Products";
import {Loader} from "shared/ui/Loader/Loader";
import {productsIsLoadingSelector} from "entities/Products/model/selectors";
import NotFound from "shared/assets/images/not-found.png";
import {BuyProductModal} from "features/BuyProduct/BuyProductModal";
import cls from "./ShopPage.module.scss";

interface ShopPageProps {
  className?: string;
}

const tabs = [
  {
    name: "all",
    title: "Все товары",
    isActive: true,
  },
  {
    name: "available",
    title: "Доступные мне",
    isActive: false,
  },
  {
    name: "mine",
    title: "Приобретённые",
    isActive: false,
  },
];

export const ShopPage = ({className}: ShopPageProps) => {
  const dispatch = useAppDispatch();

  const [activeTabName, setActiveTabName] = useState("all");
  const [productId, setProductId] = useState("");
  const handleChangeActiveTabByName = (tabName: string) => {
    setActiveTabName(tabName);
  };

  const products = useSelector(productsSelector);
  const isProductsLoading = useSelector(productsIsLoadingSelector);

  const handleClickShopCard = (productId: string) => {
    setProductId(productId);
  };
  const handleCloseBuyProductModal = () => {
    setProductId("");
  };

  const handleSubmitBuyProduct = () => {
    dispatch(fetchProductsData({filter: "all"}));
    setActiveTabName("all");
  };

  useEffect(() => {
    dispatch(fetchProductsData({filter: activeTabName}));
  }, [dispatch, activeTabName]);

  const itemsList = useMemo(
    () =>
      products?.map((item) => (
        <ShopCard
          key={`${item?.name}_${item?.price}`}
          text={item?.name}
          coinsCount={item.price}
          href={item?.content}
          img={item.picture}
          onClick={() => handleClickShopCard(item.id)}
        />
      )),
    [products]
  );

  return (
    <>
      <BuyProductModal
        onClose={handleCloseBuyProductModal}
        onSubmit={handleSubmitBuyProduct}
        opened={!!productId}
        product={products?.find((item) => item.id === productId)}
      />
      <div className={classNames(cls.Shop, {}, [className])}>
        <Heading level={1} className={cls.shopHeading}>
          Магазин
        </Heading>
        <Tabs className={cls.tabs}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={tab.title.toUpperCase()}
              active={tab.isActive}
              onClick={() => handleChangeActiveTabByName(tab.name)}
            >
              {isProductsLoading ? (
                <div className={cls.loader}>
                  <Loader />
                </div>
              ) : (
                <div className={cls.shopCardsList}>
                  {itemsList?.length === 0 ? (
                    <div className={cls["not-found"]}>
                      <img src={NotFound} alt="not-found" className={cls.img} />
                      <p>Ничего не найдено</p>
                    </div>
                  ) : (
                    itemsList
                  )}
                </div>
              )}
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};
