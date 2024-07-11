import {ReactNode} from "react";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import {PlantIcon} from "../PlantIcon/PlantIcon";
import {SeedEnum} from "entities/Inventory/model/types.ts";

export const cropIconMapper: Record<SeedEnum, ReactNode> = {
  [SeedEnum.BeetSeed]: <PlantIcon icon={<Beet />} />,
  [SeedEnum.WheatSeed]: <PlantIcon icon={<Wheat />} />,
  [SeedEnum.CarrotSeed]: <PlantIcon icon={<Carrot />} />,
  [SeedEnum.FlowerSeed]: <PlantIcon icon={<Flower />} />,
  [SeedEnum.PotatoSeed]: <PlantIcon icon={<Potato />} />,
};
