import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
async function storeItem(mode, webItem) {
  const response = await axios.post(url + `/${mode}.json`, webItem);
}
export function webStoreItem(webItem) {
  return storeItem("webItems", webItem);
}
export function noteStoreItem(noteItem) {
  return storeItem("NoteItems", noteItem);
}
