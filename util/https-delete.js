import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const url = "https://cynetcode-default-rtdb.firebaseio.com";
export async function deleteItemDB(id, type, fileName) {
  if (type == "FileItems") {
    deleteFile(fileName);
  }
  return await axios.delete(url + `/${type}/${id}.json`);
}

const deleteFile = async (fileName) => {
  const filePath = "files/" + fileName; // Replace with your file's path
  const storageRef = firebase.storage().ref();
  try {
    await storageRef.child(filePath).delete();
    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error deleting file", error.message);
  }
};
