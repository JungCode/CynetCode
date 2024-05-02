import axios from "axios";
const url = "https://cynetcode-default-rtdb.firebaseio.com";
export async function deleteItemDB(id,type) {
  return await axios.delete(url + `/${type}/${id}.json`);
}
