import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavoriteItems,
  fetchItems,
  fetchQuantity,
  webStoreItem,
  webUpdateItem,
} from "../util/http";

export const ItemsContext = createContext({
  quantityItems: [],
  items: [],
  countingQuantity: async function () {},
  fetchItemsCtx: async function () {},
  fetchFavoriteItemsCtx: async function () {},
  refresh: "",
  storeItem: () => {},
  updateItem: () => {},
});
function ItemsContextProvider({ children }) {
  const [quantityItems, setQuantityItems] = useState([]);
  const [refresh, setRefresh] = useState();
  async function countingQuantity(userId) {
    const data = await fetchQuantity(userId);
    return data;
  }

  async function fetchItemsCtx(userId) {
    const data = await fetchItems(userId);
    setRefresh(userId);
    return data;
  }

  async function fetchFavoriteItemsCtx(userId) {
    const data = await fetchFavoriteItems(userId);
    setRefresh(userId);
    return data;
  }

  async function storeItem(newItem) {
    await webStoreItem(newItem);
    setRefresh(newItem);
  }
  async function updateItem(itemId, updatedItem) {
    await webUpdateItem(itemId, updatedItem);
    setRefresh(itemId);
  }
  useEffect(() => {
    setRefresh("userId");
  }, []);
  const value = {
    quantityItems: quantityItems,
    items: [],
    countingQuantity: countingQuantity,
    fetchItemsCtx: fetchItemsCtx,
    storeItem: storeItem,
    updateItem: updateItem,
    refresh: refresh,
    fetchFavoriteItemsCtx: fetchFavoriteItemsCtx,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}
export default ItemsContextProvider;
