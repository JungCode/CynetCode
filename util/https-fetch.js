import axios from "axios";
import database from "@react-native-firebase/database";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyDBctAW7Bga97aKkuwMc8oDWKlqbwyKygo",
  authDomain: "cynetcode.firebaseapp.com",
  databaseURL: "https://cynetcode-default-rtdb.firebaseio.com",
  projectId: "cynetcode",
  storageBucket: "cynetcode.appspot.com",
  messagingSenderId: "664701731052",
  appId: "1:664701731052:web:c6e249433fa5ea3cefe5c9",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export async function fetchAllItems(userId) {
  let items = [];
  const accounts = await fetchAccounts(userId);
  items = items.concat(accounts);
  const notes = await fetchNotes(userId);
  items = items.concat(notes);
  const files = await fetchFiles(userId);
  items = items.concat(files);
  return items;
}
export async function fetchAccounts(userId) {
  const response = await axios.get(url + "/AccountItems.json");

  const items = [];

  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userName: response.data[key].userName,
      description: response.data[key].description,
      password: response.data[key].password,
      userId: response.data[key].userId,
      webName: response.data[key].webName,
      webURL: response.data[key].webURL,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId) {
      items.push(itemsObj);
    }
  }
  return items;
}
export async function fetchFiles(userId) {
  const response = await axios.get(url + "/FileItems.json");

  const items = [];

  for (const key in response.data) {
    const itemsObj = {
      id: key,
      fileTitle: response.data[key].fileTitle,
      fileDescription: response.data[key].fileDescription,
      userId: response.data[key].userId,
      imgURI: response.data[key].imgURI,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId) {
      items.push(itemsObj);
    }
  }
  return items;
}

export async function fetchFavoriteAllItems(userId) {
  let items = [];
  const fAccounts = await fetchFavoriteAccounts(userId);
  items = items.concat(fAccounts);
  const fNotes = await fetchFavoriteNotes(userId);
  items = items.concat(fNotes);
  return items;
}
export async function fetchFavoriteAccounts(userId) {
  const response = await axios.get(url + "/AccountItems.json");

  const items = [];

  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userName: response.data[key].userName,
      description: response.data[key].description,
      password: response.data[key].password,
      userId: response.data[key].userId,
      webName: response.data[key].webName,
      webURL: response.data[key].webURL,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId && itemsObj.favorite) {
      items.push(itemsObj);
    }
  }
  return items;
}
export async function fetchFavoriteNotes(userId) {
  const response = await axios.get(url + "/NoteItems.json");

  const items = [];

  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userId: response.data[key].userId,
      noteText: response.data[key].noteText,
      noteTitle: response.data[key].noteTitle,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId && itemsObj.favorite) {
      items.push(itemsObj);
    }
  }
  return items;
}
async function QuantityOfTypeItem(type, userId) {
  const quantityOfItems = {
    Quantity: 0,
    Favorites: 0,
  };
  const response = await axios.get(url + `/${type}.json`);
  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userId: response.data[key].userId,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId) {
      quantityOfItems.Quantity++;
      if (itemsObj.favorite) quantityOfItems.Favorites++;
    }
  }
  return quantityOfItems;
}
export async function fetchQuantity(userId) {
  const quantityOfItems = {
    AllItems: 0,
    Favorites: 0,
    Account: 0,
    CreaditCard: 0,
    Files: 0,
    Addresses: 0,
    Notes: 0,
  };
  const QuantityAccountItems = await QuantityOfTypeItem("AccountItems", userId);
  const QuantityOfNotes = await QuantityOfTypeItem("NoteItems", userId);
  const QuantityOfFiles = await QuantityOfTypeItem("FileItems", userId);
  quantityOfItems.AllItems =
    QuantityOfNotes.Quantity + QuantityAccountItems.Quantity;
  quantityOfItems.Favorites =
    QuantityOfNotes.Favorites + QuantityAccountItems.Favorites;
  quantityOfItems.Notes = +QuantityOfNotes.Quantity;
  quantityOfItems.Account = +QuantityAccountItems.Quantity;
  quantityOfItems.Files = +QuantityOfFiles.Quantity;
  return quantityOfItems;
}

export async function fetchNotes(userId) {
  const response = await axios.get(url + "/NoteItems.json");

  const items = [];

  for (const key in response.data) {
    const itemsObj = {
      id: key,
      userId: response.data[key].userId,
      noteText: response.data[key].noteText,
      noteTitle: response.data[key].noteTitle,
      favorite: response.data[key].favorite,
    };
    if (itemsObj.userId == userId) {
      items.push(itemsObj);
    }
  }
  return items;
}
