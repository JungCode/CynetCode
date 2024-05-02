import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
export async function updateItemDB(id, webItem, type) {
  return await axios.put(url + `/${type}/${id}.json`, webItem);
}
