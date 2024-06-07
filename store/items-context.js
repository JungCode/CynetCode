import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavoriteAllItems,
  fetchAllItems,
  fetchNotes,
  fetchQuantity,
  fetchAccounts,
  fetchFiles,
} from "../util/https-fetch";
import {
  fileStoreItem,
  noteStoreItem,
  webStoreItem,
  appStoreItem,
  addressStoreItem,
} from "../util/https-store";
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
  async function countingQuantity(userId) {
    const data = await fetchQuantity(userId);
    return data;
  }

  async function fetchItemsCtx(userId, type) {
    let data = [];
    switch (type) {
      case "accounts":
        data = await fetchAccounts(userId);
        break;
      case "allItems":
        data = await fetchAllItems(userId);
        break;
      case "favorites":
        data = await fetchFavoriteAllItems(userId);
        break;
      case "notes":
        data = await fetchNotes(userId);
        break;
      case "files":
        data = await fetchFiles(userId);
        break;
    }
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
      case "app":
        await appStoreItem(newItem);
        break;
      case "file":
        await fileStoreItem(newItem);
        break;
      case "address":
        await addressStoreItem(newItem);
        break;
    }
  }
  async function updateItem(itemId, updatedItem, type) {
    await updateItemDB(itemId, updatedItem, type);
  }
  async function deleteItem(itemId, type, file) {
    await deleteItemDB(itemId, type, file);
  }
  async function updateFavoriteItem(itemId, updatedItem, type) {
    if (updatedItem.noteTitle !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    if (updatedItem.addressName !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    if (updatedItem.webURL !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    if (updatedItem.fileName !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
    if (updatedItem.appName !== undefined) {
      await updateItemDB(itemId, updatedItem, type);
    }
  }
  const value = {
    quantityItems: quantityItems,
    items: [],
    countingQuantity: countingQuantity,
    fetchItemsCtx: fetchItemsCtx,
    storeItem: storeItem,
    updateItem: updateItem,
    fetchFavoriteItemsCtx: fetchFavoriteItemsCtx,
    deleteItem: deleteItem,
    updateFavoriteItem: updateFavoriteItem,
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
}
export default ItemsContextProvider;
