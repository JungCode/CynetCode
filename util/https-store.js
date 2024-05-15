import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "./https-fetch";
// Initialize Firebase
const url = "https://cynetcode-default-rtdb.firebaseio.com";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export async function fileStoreItem(selectedFile) {
  console.log(selectedFile);
  const response = await fetch(selectedFile.assets[0].uri);
  const blob = await response.blob();
  const fileName = "file_" + Math.random().toString(36).substring(7);
  const storageRef = firebase
    .storage()
    .ref()
    .child(
      "files/" + fileName + "." + selectedFile.assets[0].name.split(".").pop()
    );
  await storageRef.put(blob);
  const url = await storageRef.getDownloadURL();
  console.log("Uploaded document URL: ", url);
  return fileName + "." + selectedFile.assets[0].name.split(".").pop();
}
export async function storeFileDB(file, item) {
  item.fileName = await fileStoreItem(file);
  storeItem("FileItems", item);
}

async function storeItem(mode, item) {
  const response = await axios.post(url + `/${mode}.json`, item);
}
export function webStoreItem(item) {
  return storeItem("webItems", item);
}
export function noteStoreItem(noteItem) {
  return storeItem("NoteItems", noteItem);
}
