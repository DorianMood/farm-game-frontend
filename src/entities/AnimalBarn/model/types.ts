import {Animal} from "entities/Inventory";

export interface AnimalBarn {
  id: string;
  index: number;
  startedAt: string;
  animal: Animal;
}

export interface AnimalBarnSchema {
  isLoading: boolean;
  error: boolean;
  data: {
    animalBarns?: AnimalBarn[];
  };
}
