import Carrot from "shared/assets/images/farm/carrot-icon.svg";
import Potato from "shared/assets/images/farm/potato-icon.svg";
import Beet from "shared/assets/images/farm/beet-icon.svg";
import Flower from "shared/assets/images/farm/flower-icon.svg";
import Wheat from "shared/assets/images/farm/wheat-icon.svg";
import {SeedEnum} from "entities/Inventory/model/types.ts";

export const plants = [
    {
        type: SeedEnum.PotatoSeed,
        icon: Potato,
        name: 'Картофель',
        genitiveСase: 'картофеля',
        attributeName: 'potato',
    },
    {
        type: SeedEnum.CarrotSeed,
        icon: Carrot,
        name: 'Морковь',
        genitiveСase: 'моркови',
        attributeName: 'carrot',
    },
    {
        type: SeedEnum.BeetSeed,
        icon: Beet,
        name: 'Свекла',
        genitiveСase: 'свеклы',
        attributeName: 'beet',
    },
    {
        type: SeedEnum.FlowerSeed,
        icon: Flower,
        name: 'Цветы',
        genitiveСase: 'цветов',
        attributeName: 'flower',
    },
    {
        type: SeedEnum.WheatSeed,
        icon: Wheat,
        name: 'Пшеница',
        genitiveСase: 'пшеницы',
        attributeName: 'wheat',
    },
]
