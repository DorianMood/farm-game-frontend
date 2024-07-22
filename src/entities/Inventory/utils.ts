import { InventoryItem, InventoryItemCategoryEnum, InventoryItemSeed } from ".";

export const isSeed = (
  inventoryItem: InventoryItem,
): inventoryItem is InventoryItemSeed => {
  return inventoryItem.category === InventoryItemCategoryEnum.Seed;
};
