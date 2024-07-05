import {CropEnum} from "../../../entities/Bed/model/types.ts";
import Carrot from "shared/assets/images/farm/carrot-icon.svg";
import Potato from "shared/assets/images/farm/potato-icon.svg";
import Beet from "shared/assets/images/farm/beet-icon.svg";
import Flower from "shared/assets/images/farm/flower-icon.svg";
import Wheat from "shared/assets/images/farm/wheat-icon.svg";

export const plants = [
    {
        type: CropEnum.Potato,
        icon: Potato,
        name: 'potato'
    },
    {
        type: CropEnum.Carrot,
        icon: Carrot,
        name: 'carrot'
    },
    {
        type: CropEnum.Beet,
        icon: Beet,
        name: 'beet'
    },
    {
        type: CropEnum.Flower,
        icon: Flower,
        name: 'flower'
    },
    {
        type: CropEnum.Wheat,
        icon: Wheat,
        name: 'wheat'
    },
]
