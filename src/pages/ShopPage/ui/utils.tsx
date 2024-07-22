import {
  Animal,
  AnimalEnum,
  InventoryItem,
  InventoryItemCategoryEnum,
  Seed,
  SeedEnum,
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

const getSeedImage = (seed: Seed) => {
  switch (seed.type) {
    case SeedEnum.BeetSeed: {
      return <Beet />;
    }
    case SeedEnum.CarrotSeed: {
      return <Carrot />;
    }
    case SeedEnum.FlowerSeed: {
      return <Flower />;
    }
    case SeedEnum.PotatoSeed: {
      return <Potato />;
    }
    case SeedEnum.WheatSeed: {
      return <Wheat />;
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
      return null;
    }
    case InventoryItemCategoryEnum.AnimalProduct: {
      return null;
    }
    case InventoryItemCategoryEnum.PromoCode: {
      return null;
    }
  }
};
