import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";

export async function fetchAllItems(userId) {
  let items = [];
  const accounts = await fetchAccounts(userId);
  items = items.concat(accounts);
  const notes = await fetchNotes(userId);
  items = items.concat(notes);
  return items;
}
async function fetchAccounts(userId) {
  const response = await axios.get(url + "/webItems.json");

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

export async function fetchFavoriteAllItems(userId) {
  let items = [];
  const fAccounts = await fetchFavoriteAccounts(userId);
  items = items.concat(fAccounts);
  const fNotes = await fetchFavoriteNotes(userId);
  items = items.concat(fNotes);
  return items;
}
export async function fetchFavoriteAccounts(userId) {
  const response = await axios.get(url + "/webItems.json");

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
    Documents: 0,
    Addresses: 0,
    Notes: 0,
  };
  const QuantityWebItems = await QuantityOfTypeItem("webItems", userId);
  const QuantityOfNotes = await QuantityOfTypeItem("NoteItems", userId);
  quantityOfItems.AllItems =
    QuantityOfNotes.Quantity + QuantityWebItems.Quantity;
  quantityOfItems.Favorites =
    QuantityOfNotes.Favorites + QuantityWebItems.Favorites;
  quantityOfItems.Notes = +QuantityOfNotes.Quantity;
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
