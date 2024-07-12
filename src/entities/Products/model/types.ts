import {InventoryItem} from "../../Inventory";

export type Product = InventoryItem;

export type Products = {
  items: Product[];
}

export interface ProductsSchema {
  data?: Products;
  isLoading: boolean;
  isUpdating: boolean;
  error: boolean;
}
