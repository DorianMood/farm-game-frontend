import classNames from "classnames";
import {useEffect, useMemo, useState} from "react";
import {ShopCard} from "shared/ui/ShopCard/ShopCard";
import {Heading} from "shared/ui/Heading/Heading";
import {fetchProductsData} from "entities/Products/model/thunks";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {productsSelector} from "entities/Products";
import {BuyProductModal} from "features/BuyProduct";
import cls from "./ShopPage.module.scss";
import {inventorySelector} from "entities/Inventory";
import {InventoryCard} from "shared/ui/InventoryCard/InventoryCard.tsx";
import {fetchInventory} from "entities/Inventory/model/thunks";
import {getProductData} from "features/BuyProduct/utils.ts";
import {fetchUserData} from "entities/User/model/thunks.ts";
import {Tabs} from "shared/ui/Tabs/Tabs.tsx";
import {Tab} from "shared/ui/Tabs/components/tab";
import {InventoryItem, InventoryItemCategoryEnum} from "entities/Inventory/model/types.ts";
import {ShopCarousel} from "shared/ui/ShopCarousel/ShopCarousel.tsx";

interface ShopPageProps {
    className?: string;
}

const getFilter = (tabName: string, item: InventoryItem) => {
    if (tabName === 'all') {
        return (item.category === InventoryItemCategoryEnum.Animal) || (item.category === InventoryItemCategoryEnum.Seed) || (item.category === InventoryItemCategoryEnum.Fertilizer) || (item.category === InventoryItemCategoryEnum.Vitamin)
    }
    if (tabName === 'animals') {
        return item.category === InventoryItemCategoryEnum.Animal
    }
    if (tabName === 'plants') {
        return item.category === InventoryItemCategoryEnum.Seed
    }
    if (tabName === 'others') {
        return (item.category === InventoryItemCategoryEnum.Fertilizer) || (item.category === InventoryItemCategoryEnum.Vitamin)
    }
}

export const ShopPage = ({className}: ShopPageProps) => {
    const dispatch = useAppDispatch();

    const [activeTabName, setActiveTabName] = useState("all");
    const [productId, setProductId] = useState("");
    const [slotId, setSlotId] = useState("");
    const [inventoryItemsCount, setInventoryItemsCount] = useState(1);
    const [isForSell, setForSell] = useState(false);
    const [isProductsCounterDisabled, setProductsCounterDisabled] = useState(false);

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
        dispatch(fetchProductsData({filter: "all"}));
        dispatch(fetchInventory());
        dispatch(fetchUserData());
    };

    const handleChangeActiveTab = (name: string) => {
        setActiveTabName(name)
    }

    useEffect(() => {
        dispatch(fetchProductsData({filter: activeTabName}));
    }, [dispatch]);

    const inventory = useSelector(inventorySelector);

    const inventoryList = useMemo(
        () =>
            inventory?.items?.map((item) => (
                <InventoryCard
                    image={getProductData(item?.inventoryItem)?.smallImage}
                    key={`${item.inventoryItem.id}`}
                    title={item?.inventoryItem.name}
                    description={item?.inventoryItem?.description}
                    coinsCount={item.inventoryItem.price * item.inventoryItem.sellMultiplier}
                    itemsCount={item.amount}
                    background={getProductData(item?.inventoryItem)?.background}
                    onClick={() => {
                        handleClickShopCard(item.inventoryItem.id, true);
                        setSlotId(item.id);
                        setInventoryItemsCount(item.amount)
                        setProductsCounterDisabled(item.inventoryItem.category === InventoryItemCategoryEnum.Animal)
                    }}
                />
            )),
        [inventory],
    );

    const productList = useMemo(
        () => {
            return products?.items?.filter((item) => getFilter(activeTabName, item))?.map((item) => {
                return (
                    <ShopCard
                        image={getProductData(item)?.smallImage}
                        key={`${item?.id}`}
                        title={item.name}
                        background={getProductData(item)?.background}
                        description={item.description}
                        harvestTimeout={getProductData(item)?.harvestTimeout}
                        coinsCount={item.price}
                        onClick={() => {
                            handleClickShopCard(item.id, false)
                            setProductsCounterDisabled(item.category === InventoryItemCategoryEnum.Animal)
                        }}
                    />
                );
            })
        },
        [products, activeTabName],
    );

    return (
        <>
            <BuyProductModal
                isForSell={isForSell}
                onClose={handleCloseBuyProductModal}
                onSubmit={handleSubmitClickProduct}
                opened={!!productId}
                slotId={slotId}
                inventoryItemsCount={inventoryItemsCount}
                product={products?.items?.find((item) => item.id === productId)}
                isProductsCounterDisabled={isProductsCounterDisabled}
            />
            <div className={classNames(cls.Shop, {}, [className])}>
                <Heading level={1} className={cls.shopHeading}>
                    Магазин
                </Heading>
                <div className={cls.content}>
                    {!!productList?.length && <div className={cls["inventory-container"]}>
                        <Heading level={2}>Можно купить</Heading>
                        <Tabs>
                            <Tab title={'Все'} active={activeTabName === 'all'}
                                 onClick={() => handleChangeActiveTab('all')}>
                                <ShopCarousel resetActiveIndex={2}>{productList}</ShopCarousel>
                            </Tab>
                            <Tab title={'Агро-культуры'} active={activeTabName === 'plants'}
                                 onClick={() => handleChangeActiveTab('plants')}>
                                <ShopCarousel resetActiveIndex={3}>{productList}</ShopCarousel>
                            </Tab>
                            <Tab title={'Животные'} active={activeTabName === 'animals'}
                                 onClick={() => handleChangeActiveTab('animals')}>
                                <ShopCarousel resetActiveIndex={4}>{productList}</ShopCarousel>
                            </Tab>
                            <Tab title={'Прочее'} active={activeTabName === 'others'}
                                 onClick={() => handleChangeActiveTab('others')}>
                                <ShopCarousel resetActiveIndex={5}>{productList}</ShopCarousel>
                            </Tab>
                        </Tabs>
                    </div>}
                    <div className={cls["inventory-container"]}>
                        <Heading level={2}>Можно продать</Heading>
                        {!!inventoryList?.length ? (
                                <ShopCarousel resetActiveIndex={1}>{inventoryList}</ShopCarousel>
                            ) :
                            <p className={cls['no-data-text']}>Урожай и прочие товары можно будет продать здесь...</p>}
                    </div>
                </div>
            </div>
        </>
    );
};
