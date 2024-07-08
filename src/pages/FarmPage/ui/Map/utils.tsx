import {AnimalEnum} from "entities/Inventory/model/types";
import {CropEnum} from "entities/Bed/model/types";

import Pig from "shared/assets/icons/pig.svg?react";
import Cow from "shared/assets/icons/cow.svg?react";
import Sheep from "shared/assets/icons/sheep.svg?react";
import Hen from "shared/assets/icons/hen.svg?react";
import Carrot from "shared/assets/images/farm/carrot-icon.svg?react";
import Beet from "shared/assets/images/farm/beet-icon.svg?react";
import Wheat from "shared/assets/images/farm/wheat-icon.svg?react";
import Potato from "shared/assets/images/farm/potato-icon.svg?react";
import Flower from "shared/assets/images/farm/flower-icon.svg?react";

export const getAnimalImage = (animal: AnimalEnum) => {
  switch (animal) {
    case AnimalEnum.Pig:
      return <Pig />;
    case AnimalEnum.Cow:
      return <Cow />;
    case AnimalEnum.Sheep:
      return <Sheep />;
    case AnimalEnum.Hen:
      return <Hen />;
  }
};
export const getCropImage = (crop: CropEnum) => {
  switch (crop) {
    case CropEnum.Carrot:
      return <Carrot />;
    case CropEnum.Wheat:
      return <Wheat />;
    case CropEnum.Potato:
      return <Potato />;
    case CropEnum.Beet:
      return <Beet />;
    case CropEnum.Flower:
      return <Flower />;
  }
};
