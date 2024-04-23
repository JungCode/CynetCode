import axios from "axios";
import { useContext, useState } from "react";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
async function storeItem(mode, webItem) {
  const response = await axios.post(url + "/webItems.json", webItem);
}
export async function fetchItems(userId) {
  const response = await axios.get(url + "/webItems.json");

  const items = [];
  const quantityOfItems = {
    allItems: 0,
    Favorites: 0,
    Account: 0,
    CreaditCard: 0,
    Documents: 0,
    Addresses: 0,
    Notes: 0,
  };
  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userName: response.data[key].userName,
      description: response.data[key].description,
      password: response.data[key].password,
      userId: response.data[key].userId,
      webName: response.data[key].webName,
      webURL: response.data[key].webURL,
    };
    if (itemsObj.userId == userId) {
      items.push(itemsObj);
      quantityOfItems.allItems++;
    }
  }

  return items;
}

export function webStoreItem(webItem) {
  return storeItem("webStoreItem", webItem);
}
export async function webUpdateItem(id, webItem) {
  return await axios.put(url + `/webItems/${id}.json`, webItem);
}
export async function webDeleteItem(id) {
  return await axios.delete(url + `/webItems/${id}.json`);
}
