import {ReactNode} from "react";
import {CropEnum} from "entities/Bed/model/types";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import {PlantIcon} from "../PlantIcon/PlantIcon";

export const cropIconMapper: Record<CropEnum, ReactNode> = {
  [CropEnum.Beet]: <PlantIcon icon={<Beet />} />,
  [CropEnum.Wheat]: <PlantIcon icon={<Wheat />} />,
  [CropEnum.Carrot]: <PlantIcon icon={<Carrot />} />,
  [CropEnum.Flower]: <PlantIcon icon={<Flower />} />,
  [CropEnum.Potato]: <PlantIcon icon={<Potato />} />,
};
