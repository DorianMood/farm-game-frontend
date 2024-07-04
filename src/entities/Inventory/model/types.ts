import {CropEnum} from "entities/Bed/model/types";

export interface Inventory {
  items: InventoryItem[];
}

export interface InventoryItem {
  amount: number;
  farmProduct: FarmProduct;
}

export interface FarmProductAnimal {
  price: number;
  sellMultiplier: number;
  type: FarmProductEnum.Animal;
  animal: Animal;
}

export interface FarmProductSeed {
  price: number;
  sellMultiplier: number;
  type: FarmProductEnum.Seed;
  seed: Seed;
}

export interface FarmProductCrop {
  price: number;
  sellMultiplier: number;
  type: FarmProductEnum.Plant;
  seed: Crop;
}

export type FarmProduct = FarmProductAnimal | FarmProductCrop | FarmProductSeed;

export enum FarmProductEnum {
  Plant = "Plant",
  Seed = "Seed",
  Animal = "Animal",
}

export interface Animal {
  type: AnimalEnum;
  harvestTimeout: number;
  name: string;
  description: string;
}

export enum AnimalEnum {
  Pig = "Pig",
  Cow = "Cow",
  Sheep = "Sheep",
  Hen = "Hen",
}

export interface Crop {
  type: CropEnum;
  harvestTimeout: number;
  name: string;
  description: string;
}

export interface Seed {
  crop: Crop;
}

export interface InventorySchema {
  isLoading: boolean;
  error: boolean;
  data: {
    inventory?: Inventory;
  };
}

export const InventoryEnums = {AnimalEnum, FarmProductEnum};
