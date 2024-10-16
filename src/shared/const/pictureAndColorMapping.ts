import PotatoSeedImage from "shared/assets/images/inventory/potato-seed.png";
import BeetSeedImage from  "shared/assets/images/inventory/beet-seed.png";
import CarrotSeedImage from "shared/assets/images/inventory/carrot-seed.png";
import WheetSeedImage from "shared/assets/images/inventory/wheet-seed.png";
import FlowerSeedImage from "shared/assets/images/inventory/flower-seed.png";
import PotatoImage from "shared/assets/images/inventory/potato.png";
import BeetImage from "shared/assets/images/inventory/beet.png";
import CarrotImage from "shared/assets/images/inventory/carrot.png";
import WheetImage from "shared/assets/images/inventory/wheet.png";
import FlowerImage from "shared/assets/images/inventory/flower.png";
import HenAnimalImage from "shared/assets/images/inventory/hen-animal.png";
import PigAnimalImage from "shared/assets/images/inventory/pig-animal.png";
import SheepAnimalImage from "shared/assets/images/inventory/sheep-animal.png";
import CowAnimalImage from "shared/assets/images/inventory/cow-animal.png";
import HenImage from "shared/assets/images/inventory/hen.png";
import PigImage from "shared/assets/images/inventory/pig.png";
import SheepImage from "shared/assets/images/inventory/sheep.png";
import CowImage from "shared/assets/images/inventory/cow.png";
import SmallPotatoSeedImage from "shared/assets/images/inventory/small-potato-seed.png";
import SmallBeetSeedImage from  "shared/assets/images/inventory/small-beet-seed.png";
import SmallCarrotSeedImage from "shared/assets/images/inventory/small-carrot-seed.png";
import SmallWheatSeedImage from "shared/assets/images/inventory/small-wheat-seed.png";
import SmallFlowerSeedImage from "shared/assets/images/inventory/small-flower-seed.png";
import SmallPotatoImage from "shared/assets/images/inventory/small-potato.png";
import SmallBeetImage from "shared/assets/images/inventory/small-beet.png";
import SmallCarrotImage from "shared/assets/images/inventory/small-carrot.png";
import SmallWheatImage from "shared/assets/images/inventory/small-wheat.png";
import SmallFlowerImage from "shared/assets/images/inventory/small-flower.png";
import SmallHenAnimalImage from "shared/assets/images/inventory/small-hen-animal.png";
import SmallPigAnimalImage from "shared/assets/images/inventory/small-pig-animal.png";
import SmallSheepAnimalImage from "shared/assets/images/inventory/small-sheep-animal.png";
import SmallCowAnimalImage from "shared/assets/images/inventory/small-cow-animal.png";
import SmallHenImage from "shared/assets/images/inventory/small-hen.png";
import SmallPigImage from "shared/assets/images/inventory/small-pig.png";
import SmallSheepImage from "shared/assets/images/inventory/small-sheep.png";
import SmallCowImage from "shared/assets/images/inventory/small-cow.png";
import FertilizedImage from "shared/assets/images/inventory/fertilized.png";
import FertilizedSmallImage from "shared/assets/images/inventory/fertilized-small.png";
import VitaminImage from "shared/assets/images/inventory/vitamin.png";
import VitaminSmallImage from "shared/assets/images/inventory/vitamin-small.png";

import {
    AnimalEnum, AnimalProductEnum,
    SeedEnum,
    SeedProductEnum
} from "entities/Inventory/model/types.ts";

type ImageAndBackground = {
    image: string;
    smallImage: string;
    background: string;
    nameForBuyOrSell: string;
}

export const seedToImageAndBackgroundMapper: Record<SeedEnum, ImageAndBackground> = {
    [SeedEnum.BeetSeed]: {
        image: BeetSeedImage,
        smallImage: SmallBeetSeedImage,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, #DDB5FF 100%)',
        nameForBuyOrSell: 'cемена свеклы'
    },
    [SeedEnum.PotatoSeed]: {
        image: PotatoSeedImage,
        smallImage: SmallPotatoSeedImage,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, #FFCB8F 100%)',
        nameForBuyOrSell: 'клубни картофеля'
    },
    [SeedEnum.FlowerSeed]: {
        image: FlowerSeedImage,
        smallImage: SmallFlowerSeedImage,
        background: 'linear-gradient(135deg, #FAEEFF 45%, #E4ABFF 100%)',
        nameForBuyOrSell: 'луковицы цветов',
    },
    [SeedEnum.CarrotSeed]: {
        image: CarrotSeedImage,
        smallImage: SmallCarrotSeedImage,
        background: 'linear-gradient(135deg, #FFF8E5 0%, #57FF55 100%)',
        nameForBuyOrSell: 'семена моркови',
    },
    [SeedEnum.WheatSeed]: {
        image: WheetSeedImage,
        smallImage: SmallWheatSeedImage,
        background: 'linear-gradient(135deg, #FFF7E5 45%, #FFCB8F 100%)',
        nameForBuyOrSell: 'семена пшеницы'
    }
}

export const seedProductToImageAndBackgroundMapper: Record<SeedProductEnum, ImageAndBackground> = {
    [SeedProductEnum.Carrot]: {
        image: CarrotImage,
        smallImage: SmallCarrotImage,
        background: 'linear-gradient(135deg, #FFF8E5 0%, #57FF55 100%)',
        nameForBuyOrSell: 'морковь'
    },
    [SeedProductEnum.Potato]: {
        image: PotatoImage,
        smallImage: SmallPotatoImage,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, #FFCB8F 100%)',
        nameForBuyOrSell: 'картофель'

    },
    [SeedProductEnum.Flower]: {
        image: FlowerImage,
        smallImage: SmallFlowerImage,
        background: 'linear-gradient(135deg, #FAEEFF 45%, #E4ABFF 100%)',
        nameForBuyOrSell: 'цветы'
    },
    [SeedProductEnum.Wheat]: {
        image: WheetImage,
        smallImage: SmallWheatImage,
        background: 'linear-gradient(135deg, #FFF7E5 45%, #FFCB8F 100%)',
        nameForBuyOrSell: 'пшеницу'
    },
    [SeedProductEnum.Beet]: {
        image: BeetImage,
        smallImage: SmallBeetImage,
        background: 'linear-gradient(135deg, rgba(220, 255, 255, 1) 0%, #DDB5FF 100%)',
        nameForBuyOrSell: 'свеклу'
    }
}

export const animalToImageAndBackgroundMapper: Record<AnimalEnum, ImageAndBackground> = {
    [AnimalEnum.HenAnimal]: {
        image: HenAnimalImage,
        smallImage: SmallHenAnimalImage,
        background: 'linear-gradient(135deg, #E2FEFF 45%, #79EFFF 100%)',
        nameForBuyOrSell: 'курицу'
    },
    [AnimalEnum.SheepAnimal]: {
        image: SheepAnimalImage,
        smallImage: SmallSheepAnimalImage,
        background: 'linear-gradient(135deg, #EDFFE5 45%, #D5FF88 100%)',
        nameForBuyOrSell: 'овцу'
    },
    [AnimalEnum.PigAnimal]: {
        image: PigAnimalImage,
        smallImage: SmallPigAnimalImage,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, #FFB5B7 100%)',
        nameForBuyOrSell: 'свинью'
    },
    [AnimalEnum.CowAnimal]: {
        image: CowAnimalImage,
        smallImage: SmallCowAnimalImage,
        background: 'linear-gradient(135deg, #FFF7E5 45%, #FFCB8F 100%)',
        nameForBuyOrSell: 'корову'
    },
}

export const animalProductToImageAndBackgroundMapper: Record<AnimalProductEnum, ImageAndBackground> = {
    [AnimalProductEnum.Hen]: {
        image: HenImage,
        smallImage: SmallHenImage,
        background: 'linear-gradient(135deg, #F7FAFF 45%, #96C4CC 100%)',
        nameForBuyOrSell: 'куриные яйца'
    },
    [AnimalProductEnum.Sheep]: {
        image: SheepImage,
        smallImage: SmallSheepImage,
        background: 'linear-gradient(135deg, #EBE7FF 45%, #89C9FF 100%)',
        nameForBuyOrSell: 'овечью шерсть'
    },
    [AnimalProductEnum.Pig]: {
        image: PigImage,
        smallImage: SmallPigImage,
        background: 'linear-gradient(135deg, #FFE6E6 45%, #FF9E93 100%)',
        nameForBuyOrSell: 'свинину'
    },
    [AnimalProductEnum.Cow]: {
        image: CowImage,
        smallImage: SmallCowImage,
        background: 'linear-gradient(135deg, #E8F0FF 45%, #96C4CC 100%)',
        nameForBuyOrSell: 'молоко коровы'
    },
}

export const fertilizerToImageAndBackgroundMapper: ImageAndBackground= {
    image: FertilizedImage,
    smallImage: FertilizedSmallImage,
    background: 'linear-gradient(135deg, #EDFFE5 45%, #D5FF88 100%)',
    nameForBuyOrSell: 'удобрения'
};

export const vitaminToImageAndBackgroundMapper: ImageAndBackground= {
    image: VitaminImage,
    smallImage: VitaminSmallImage,
    background: 'linear-gradient(135deg, #E2FEFF 45%, #79EFFF 100%)',
    nameForBuyOrSell: 'витамины'
};
