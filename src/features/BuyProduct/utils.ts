import {
    InventoryItem,
    InventoryItemAnimal, InventoryItemAnimalProduct,
    InventoryItemSeed,
    InventoryItemSeedProduct
} from "../../entities/Inventory";
import {InventoryItemCategoryEnum} from "../../entities/Inventory/model/types.ts";
import {Product} from "../../entities/Products/model/types.ts";
import {
    animalProductToImageAndBackgroundMapper,
    animalToImageAndBackgroundMapper,
    seedProductToImageAndBackgroundMapper,
    seedToImageAndBackgroundMapper
} from "../../shared/const/pictureAndColorMapping.ts";

const isSeed = (
    inventoryItem: InventoryItem,
): inventoryItem is InventoryItemSeed => {
    return inventoryItem.category === InventoryItemCategoryEnum.Seed;
};

const isSeedProduct = (
    inventoryItem: InventoryItem,
): inventoryItem is InventoryItemSeedProduct => {
    return inventoryItem.category === InventoryItemCategoryEnum.SeedProduct;
};

const isAnimal = (
    inventoryItem: InventoryItem,
): inventoryItem is InventoryItemAnimal => {
    return inventoryItem.category === InventoryItemCategoryEnum.Animal;
};

const isAnimalProduct = (
    inventoryItem: InventoryItem,
): inventoryItem is InventoryItemAnimalProduct => {
    return inventoryItem.category === InventoryItemCategoryEnum.AnimalProduct;
};


export const getProductData = (product?: Product) => {
    if (!product) {
        return {
            background: '',
            image: '',
            nameForBuyOrSell: '',
            smallImage: '',
        }
    }

    if (isSeed(product)) {
        return {
            background: seedToImageAndBackgroundMapper[product.seed.type].background,
            image: seedToImageAndBackgroundMapper[product.seed.type].image,
            nameForBuyOrSell: seedToImageAndBackgroundMapper[product.seed.type].nameForBuyOrSell,
            smallImage: seedToImageAndBackgroundMapper[product.seed.type].smallImage,
        }
    }
    if (isSeedProduct(product)) {
        return {
            background: seedProductToImageAndBackgroundMapper[product.seedProduct.type].background,
            image: seedProductToImageAndBackgroundMapper[product.seedProduct.type].image,
            nameForBuyOrSell: seedProductToImageAndBackgroundMapper[product.seedProduct.type].nameForBuyOrSell,
            smallImage: seedProductToImageAndBackgroundMapper[product.seedProduct.type].smallImage,
        }
    }

    if (isAnimal(product)) {
        return {
            background: animalToImageAndBackgroundMapper[product.animal.type].background,
            image: animalToImageAndBackgroundMapper[product.animal.type].image,
            nameForBuyOrSell: animalToImageAndBackgroundMapper[product.animal.type].nameForBuyOrSell,
            smallImage: animalToImageAndBackgroundMapper[product.animal.type].smallImage,
        }
    }

    if (isAnimalProduct(product)) {
        return {
            background: animalProductToImageAndBackgroundMapper[product.animalProduct.type].background,
            image: animalProductToImageAndBackgroundMapper[product.animalProduct.type].image,
            nameForBuyOrSell: animalProductToImageAndBackgroundMapper[product.animalProduct.type].nameForBuyOrSell,
            smallImage: animalProductToImageAndBackgroundMapper[product.animalProduct.type].smallImage,
        }
    }
}