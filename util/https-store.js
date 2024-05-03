import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
async function storeItem(mode, item) {
  const response = await axios.post(url + `/${mode}.json`, item);
}
export function webStoreItem(item) {
  return storeItem("AccountItems", item);
}
export function noteStoreItem(noteItem) {
  return storeItem("NoteItems", noteItem);
}
export function fileStoreItem(item) {
  return storeItem("FileItems", item);
}
