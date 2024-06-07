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
  const response = await fetch(selectedFile.uri);
  const uriFile = selectedFile.uri;
  const startIndex = uriFile.lastIndexOf(".");
  // Extract the substring from startIndex to get "jpg"
  const extension = uriFile.substring(startIndex + 1);
  const blob = await response.blob();
  const fileName = "file_" + Math.random().toString(36).substring(7);
  const storageRef = firebase
    .storage()
    .ref()
    .child("files/" + fileName + "." + extension);
  await storageRef.put(blob);
  const url = await storageRef.getDownloadURL();
  console.log("Uploaded document URL: ", url);
  return fileName + "." + extension;
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
export function appStoreItem(item) {
  return storeItem("appItems", item);
}
export function noteStoreItem(noteItem) {
  return storeItem("NoteItems", noteItem);
}
export function addressStoreItem(addressItem) {
  return storeItem("addressItems", addressItem);
}
