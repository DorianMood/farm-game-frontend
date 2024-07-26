import WheetImage from "shared/assets/images/wheat.png";
import {
    AnimalEnum, AnimalProductEnum,
    SeedEnum,
    SeedProductEnum
} from "entities/Inventory/model/types.ts";

type ImageAndBackground = {
    image: string;
    background: string;
    nameForBuyOrSell: string;
}

export const seedToImageAndBackgroundMapper: Record<SeedEnum, ImageAndBackground> = {
    [SeedEnum.BeetSeed]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'cемена свеклы'
    },
    [SeedEnum.PotatoSeed]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'клубни картофеля'
    },
    [SeedEnum.FlowerSeed]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,36,15,1) 180%)',
        nameForBuyOrSell: 'луковицы тюльпана',
    },
    [SeedEnum.CarrotSeed]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'семена моркови',
    },
    [SeedEnum.WheatSeed]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(177,74,0,1) 180%)',
        nameForBuyOrSell: 'семена пшеницы'
    }
}

export const seedProductToImageAndBackgroundMapper: Record<SeedProductEnum, ImageAndBackground> = {
    [SeedProductEnum.Carrot]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'морковь'
    },
    [SeedProductEnum.Potato]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'картофель'

    },
    [SeedProductEnum.Flower]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,36,15,1) 180%)',
        nameForBuyOrSell: 'цветы'
    },
    [SeedProductEnum.Wheat]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(177,74,0,1) 180%)',
        nameForBuyOrSell: 'пшеницу'
    },
    [SeedProductEnum.Beet]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(177,74,0,1) 180%)',
        nameForBuyOrSell: 'свеклу'
    }
}

export const animalToImageAndBackgroundMapper: Record<AnimalEnum, ImageAndBackground> = {
    [AnimalEnum.HenAnimal]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'курицу'
    },
    [AnimalEnum.SheepAnimal]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'овцу'
    },
    [AnimalEnum.PigAnimal]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,36,15,1) 180%)',
        nameForBuyOrSell: 'свинью'
    },
    [AnimalEnum.CowAnimal]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(177,74,0,1) 180%)',
        nameForBuyOrSell: 'корову'
    },
}

export const animalProductToImageAndBackgroundMapper: Record<AnimalProductEnum, ImageAndBackground> = {
    [AnimalProductEnum.Hen]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'куриные яйца'
    },
    [AnimalProductEnum.Sheep]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(149,15,240,1) 180%)',
        nameForBuyOrSell: 'овечью шерсть'
    },
    [AnimalProductEnum.Pig]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,36,15,1) 180%)',
        nameForBuyOrSell: 'свинину'
    },
    [AnimalProductEnum.Cow]: {
        image: WheetImage,
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(177,74,0,1) 180%)',
        nameForBuyOrSell: 'молоко коровы'
    },
}
