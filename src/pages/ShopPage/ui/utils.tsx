import {
  Animal,
  AnimalEnum,
  AnimalProduct,
  AnimalProductEnum,
  InventoryItem,
  InventoryItemCategoryEnum,
  Seed,
  SeedEnum,
  SeedProduct,
  SeedProductEnum,
} from "entities/Inventory/model/types";

import Pig from "shared/assets/icons/pig.svg?react";
import Cow from "shared/assets/icons/cow.svg?react";
import Sheep from "shared/assets/icons/sheep.svg?react";
import Hen from "shared/assets/icons/hen.svg?react";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";

import Pork from "shared/assets/images/farm/pork-icon.svg?react";
import Milk from "shared/assets/images/farm/milk-icon.svg?react";
import Wheel from "shared/assets/images/farm/wheel-icon.svg?react";
import Egg from "shared/assets/images/farm/egg-icon.svg?react";
import CarrotSeed from "shared/assets/images/farm/carrot-seed.svg?react";
import BeetSeed from "shared/assets/images/farm/beet-seed.svg?react";
import PotatoSeed from "shared/assets/images/farm/potato-seed.svg?react";
import WheatSeed from "shared/assets/images/farm/wheat-seed.svg?react";
import FlowerSeed from "shared/assets/images/farm/flower-seed.svg?react";

const getSeedImage = (seed: Seed) => {
  switch (seed.type) {
    case SeedEnum.BeetSeed: {
      return <BeetSeed />;
    }
    case SeedEnum.CarrotSeed: {
      return <CarrotSeed />;
    }
    case SeedEnum.FlowerSeed: {
      return <FlowerSeed />;
    }
    case SeedEnum.PotatoSeed: {
      return <PotatoSeed />;
    }
    case SeedEnum.WheatSeed: {
      return <WheatSeed />;
    }
  }
};

export const getAnimalImage = (animal: Animal) => {
  switch (animal.type) {
    case AnimalEnum.PigAnimal:
      return <Pig />;
    case AnimalEnum.CowAnimal:
      return <Cow />;
    case AnimalEnum.SheepAnimal:
      return <Sheep />;
    case AnimalEnum.HenAnimal:
      return <Hen />;
  }
};

export const getAnimalProductImage = (animalProduct: AnimalProduct) => {
  switch (animalProduct.type) {
    case AnimalProductEnum.Pig:
      return <Pork />;
    case AnimalProductEnum.Cow:
      return <Milk />;
    case AnimalProductEnum.Sheep:
      return <Wheel />;
    case AnimalProductEnum.Hen:
      return <Egg />;
  }
};

const getSeedProductImage = (seed: SeedProduct) => {
  switch (seed.type) {
    case SeedProductEnum.Beet: {
      return <Beet />;
    }
    case SeedProductEnum.Carrot: {
      return <Carrot />;
    }
    case SeedProductEnum.Flower: {
      return <Flower />;
    }
    case SeedProductEnum.Potato: {
      return <Potato />;
    }
    case SeedProductEnum.Wheat: {
      return <Wheat />;
    }
  }
};

export const getInventoryItemImage = (item: InventoryItem) => {
  const category = item.category;

  switch (category) {
    case InventoryItemCategoryEnum.Seed: {
      return getSeedImage(item.seed);
    }
    case InventoryItemCategoryEnum.Animal: {
      return getAnimalImage(item.animal);
    }
    case InventoryItemCategoryEnum.SeedProduct: {
      return getSeedProductImage(item.seedProduct);
    }
    case InventoryItemCategoryEnum.AnimalProduct: {
      return getAnimalProductImage(item.animalProduct);
    }
    case InventoryItemCategoryEnum.PromoCode: {
      return null;
    }
  }
};
