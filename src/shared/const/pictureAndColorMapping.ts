
import BuyImage from "shared/assets/images/buy.png";
import {InventoryItemCategoryEnum, SeedEnum} from "entities/Inventory/model/types.ts";

type ImageAndBackground = {
    image: string;
    background: string;
}

const seedToImageAndBackgroundMapper: Record<SeedEnum, ImageAndBackground> = {
    [SeedEnum.BeetSeed]: {
        image: BuyImage,
        background: ''
    },
    [SeedEnum.PotatoSeed]: {
        image: BuyImage,
        background: ''
    },
    [SeedEnum.FlowerSeed]: {
        image: BuyImage,
        background: ''
    },
    [SeedEnum.CarrotSeed]: {
        image: BuyImage,
        background: ''
    },
    [SeedEnum.WheatSeed]: {
        image: BuyImage,
        background: ''
    }
}

export const getByCategory = (category: InventoryItemCategoryEnum, type: SeedEnum) => {
    switch (category) {
        case InventoryItemCategoryEnum.Seed:
            return seedToImageAndBackgroundMapper[type]
    }
}