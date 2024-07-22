import { Seed } from "entities/Inventory";

export enum CropEnum {
  Carrot = "Carrot",
  Potato = "Potato",
  Beet = "Beet",
  Wheat = "Wheat",
  Flower = "Flower",
}

export interface Bed {
  id: string;
  index: number;
  plantedAt: string;
  crop: Seed;
}

export interface BedsSchema {
  isLoading: boolean;
  error: boolean;
  data: {
    beds?: Bed[];
  };
}
