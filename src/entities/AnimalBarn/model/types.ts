import {AnimalEnum} from "entities/Inventory";

export interface AnimalBarn {
  id: string;
  index: number;
  startTime: string;
  animal: AnimalEnum;
}

export interface AnimalBarnSchema {
  isLoading: boolean;
  error: boolean;
  data: {
    animalBarns: AnimalBarn[];
  };
}
