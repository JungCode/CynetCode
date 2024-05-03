import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
export async function updateItemDB(id, item, type) {
  return await axios.put(url + `/${type}/${id}.json`, item);
}
