import React, { useState } from "react";
import { View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from Expo
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker from Expo
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBctAW7Bga97aKkuwMc8oDWKlqbwyKygo",
  authDomain: "cynetcode.firebaseapp.com",
  databaseURL: "https://cynetcode-default-rtdb.firebaseio.com",
  projectId: "cynetcode",
  storageBucket: "cynetcode.appspot.com",
  messagingSenderId: "664701731052",
  appId: "1:664701731052:web:c6e249433fa5ea3cefe5c9",
};

if (true) {
  initializeApp(firebaseConfig);
}

const Test = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = async () => {
    if (selectedFile.type === "image") {
      // Upload image
      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();
      const imageName = "image_" + Math.random().toString(36).substring(7);
      const storageRef = firebase
        .storage()
        .ref()
        .child("images/" + imageName);
      await storageRef.put(blob);
      const url = await storageRef.getDownloadURL();
      console.log("Uploaded image URL: ", url);
    } else {
      // Upload document
      const response = await fetch(selectedFile.uri);
      const blob = await response.blob();
      const fileName = "document_" + Math.random().toString(36).substring(7);
      const storageRef = firebase
        .storage()
        .ref()
        .child(
          "documents/" + fileName + "." + selectedFile.name.split(".").pop()
        );
      await storageRef.put(blob);
      const url = await storageRef.getDownloadURL();
      console.log("Uploaded document URL: ", url);
    }
  };

  const chooseFile = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    setSelectedFile(file);
  };

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedFile({
        uri: result.uri,
        type: "image",
      });
    }
  };

  return (
    <View style={{marginTop:100}}>
      <Button title="Choose File" onPress={chooseFile} />
      <Button title="Choose Image" onPress={chooseImage} />
      {selectedFile && selectedFile.type === "image" && (
        <Image
          source={{ uri: selectedFile.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload File" onPress={uploadFile} />
    </View>
  );
};

export default Test;
