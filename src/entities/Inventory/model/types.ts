export interface Inventory {
  items: InventorySlot[];
}

export interface InventorySlot {
  id: string;
  amount: number;
  inventoryItem: InventoryItem;
}

export enum InventoryItemCategoryEnum {
  Seed = "Seed",
  Animal = "Animal",
  SeedProduct = "SeedProduct",
  AnimalProduct = "AnimalProduct",
  PromoCode = "PromoCode",
  Fertilizer = "Fertilizer",
  Vitamin = "Vitamin",
}

export enum SeedEnum {
  CarrotSeed = "CarrotSeed",
  BeetSeed = "BeetSeed",
  FlowerSeed = "FlowerSeed",
  PotatoSeed = "PotatoSeed",
  WheatSeed = "WheatSeed",
}

export enum AnimalEnum {
  PigAnimal = "PigAnimal",
  CowAnimal = "CowAnimal",
  SheepAnimal = "SheepAnimal",
  HenAnimal = "HenAnimal",
}

export enum SeedProductEnum {
  Carrot = "Carrot",
  Flower = "Flower",
  Potato = "Potato",
  Wheat = "Wheat",
  Beet = "Beet",
}

export enum AnimalProductEnum {
  Pig = "Pig",
  Cow = "Cow",
  Sheep = "Sheep",
  Hen = "Hen",
}

export interface AnimalProduct {
  id: string;
  type: AnimalProductEnum;
  // some other unique fields
}

export interface SeedProduct {
  id: string;
  type: SeedProductEnum;
  // some other unique fields
}

export interface Animal {
  id: string;
  type: AnimalEnum;
  harvestTimeout: number;
  // some other unique fields
}

export interface Seed {
  id: string;
  type: SeedEnum;
  harvestTimeout: number;
  // some other unique fields
}

export type InventoryItem =
  | InventoryItemSeed
  | InventoryItemSeedProduct
  | InventoryItemAnimal
  | InventoryItemAnimalProduct
  | InventoryItemPromoCode
  | InventoryItemFertilizer
  | InventoryItemVitamin;

export interface InventoryItemBase {
  id: string;
  name: string;
  description: string;
  price: number;
  sellMultiplier: number;
  category: InventoryItemCategoryEnum;
}

export interface InventoryItemAnimal extends InventoryItemBase {
  category: InventoryItemCategoryEnum.Animal;
  animal: Animal;
}

export interface InventoryItemAnimalProduct extends InventoryItemBase {
  category: InventoryItemCategoryEnum.AnimalProduct;
  animalProduct: AnimalProduct;
}

export interface InventoryItemSeed extends InventoryItemBase {
  category: InventoryItemCategoryEnum.Seed;
  seed: Seed;
}

export interface InventoryItemSeedProduct extends InventoryItemBase {
  category: InventoryItemCategoryEnum.SeedProduct;
  seedProduct: SeedProduct;
}

export interface InventoryItemPromoCode extends InventoryItemBase {
  category: InventoryItemCategoryEnum.PromoCode;
  link: string;
}

export interface InventoryItemFertilizer extends InventoryItemBase {
  category: InventoryItemCategoryEnum.Fertilizer;
  fertilizer: { id: string };
}

export interface InventoryItemVitamin extends InventoryItemBase {
  category: InventoryItemCategoryEnum.Vitamin;
  vitamin: { id: string };
}

export interface InventorySchema {
  isLoading: boolean;
  error: boolean;
  data: {
    inventory?: Inventory;
  };
}
