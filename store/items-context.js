import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavoriteAllItems,
  fetchAllItems,
  fetchNotes,
  fetchQuantity,
} from "../util/https-fetch";
import { noteStoreItem, webStoreItem } from "../util/https-store";
import { updateItemDB } from "../util/https-update";
import { deleteItemDB } from "../util/https-delete";

export const ItemsContext = createContext({
  quantityItems: [],
  items: [],
  refreshFavorite: "",
  refreshQuantity: "",
  countingQuantity: async function () {},
  fetchItemsCtx: async function () {},
  fetchFavoriteItemsCtx: async function () {},
  refresh: "",
  storeItem: () => {},
  updateItem: () => {},
  updateFavoriteItem: () => {},
  deleteItem: () => {},
  fetchNotesCtx: () => {},
});
function ItemsContextProvider({ children }) {
  const [quantityItems, setQuantityItems] = useState([]);
  const [refresh, setRefresh] = useState();
  const [refreshQuantity, setRefreshQuantity] = useState();
  const [refreshFavorite, setRefreshFavorite] = useState();
  async function countingQuantity(userId) {
    const data = await fetchQuantity(userId);
    return data;
  }

  async function fetchItemsCtx(userId) {
    const data = await fetchAllItems(userId);
    return data;
  }
  async function fetchNotesCtx(userId) {
    const data = await fetchNotes(userId);
    return data;
  }

  async function fetchFavoriteItemsCtx(userId) {
    const data = await fetchFavoriteAllItems(userId);
    return data;
  }

  async function storeItem(newItem, type) {
    switch (type) {
      case "note":
        await noteStoreItem(newItem);
        break;
      case "web":
        await webStoreItem(newItem);
        break;
    }
    setRefresh(Math.random());
  }
  async function updateItem(itemId, updatedItem, type) {
    await updateItemDB(itemId, updatedItem, type);
    setRefresh(Math.random());
  }
  async function deleteItem(itemId, type) {
    await deleteItemDB(itemId, type);
    setRefresh(Math.random());
  }
  async function updateFavoriteItem(itemId, updatedItem, type) {
    if (updatedItem.noteTitle !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    if (updatedItem.webURL !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    setRefreshFavorite(Math.random());
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
    refreshFavorite: refreshFavorite,
    fetchFavoriteItemsCtx: fetchFavoriteItemsCtx,
    deleteItem: deleteItem,
    updateFavoriteItem: updateFavoriteItem,
    fetchNotesCtx: fetchNotesCtx,
    refreshQuantity: refreshQuantity,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}
export default ItemsContextProvider;
