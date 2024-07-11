import {SeedEnum} from "entities/Inventory/model/types.ts";
import {CropEnum} from "entities/Bed/model/types.ts";

export const mapSeedToCrop: Record<SeedEnum, CropEnum> = {
    [SeedEnum.WheatSeed]: CropEnum.Wheat,
    [SeedEnum.CarrotSeed]: CropEnum.Carrot,
    [SeedEnum.FlowerSeed]: CropEnum.Flower,
    [SeedEnum.PotatoSeed]: CropEnum.Potato,
    [SeedEnum.BeetSeed]: CropEnum.Beet,

}