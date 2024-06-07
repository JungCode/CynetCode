import { Button, Image, StyleSheet, ToastAndroid, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { ItemsContext } from "../../store/items-context";
import { storeFileDB } from "../../util/https-store";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "../../util/https-fetch";
import CusButton from "../../components/CusButton";
function FileAddingScreen() {
  const route = useRoute();
  let fileType;
  if (route.params.mimeType == undefined) {
    fileType = "photo";
  } else if (route.params.mimeType.startsWith("image/")) {
    fileType = "photo";
  } else if (route.params.mimeType === "application/pdf") {
    fileType = "pdf";
  } else {
    fileType = "word";
  }
  console.log(fileType);
  const [fileTitle, setFileTitle] = useState(
    route.params ? route.params.fileTitle : ""
  );
  const [fileDescription, setFileDescription] = useState(
    route.params ? route.params.fileDescription : ""
  );
  const [fileUri, setfileUri] = useState(route.params.uri);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [isStoring, setIsStoring] = useState(false);
  const navigation = useNavigation();
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "fileTitle":
        setFileTitle(enteredValue);
        break;
      case "fileDescription":
        setFileDescription(enteredValue);
        break;
      case "fileUri":
        setfileUri(enteredValue);
        break;
    }
  }
  function submitHandler() {
    const item = {
      favorite: false,
      fileDescription: fileDescription,
      fileTitle: fileTitle,
      fileName: "",
      fileType: fileType,
      userId: authCtx.userId,
    };
    setIsStoring(true);
    if (route.params.fileTitle !== undefined) {
      itemsCtx.updateItem(route.params.id, item, "FileItems");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Edited item successfull!", ToastAndroid.SHORT);
    } else {
      storeFileDB(route.params, item);
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Added item successfull!", ToastAndroid.SHORT);
    }
    setIsStoring(false);
  }

  useEffect(() => {
    async function getFile() {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const storageRef = firebase.storage().ref();

      try {
        // Lấy đường dẫn của ảnh trong Firebase Storage
        const imageUrl = await storageRef
          .child("files/" + route.params.fileName)
          .getDownloadURL();
        setfileUri(imageUrl);
      } catch (error) {
        console.error("Error displaying image:", error);
      }
    }
    if (route.params.fileTitle != undefined) {
      getFile();
    }
  }, []);

  if (isStoring) {
    return <LoadingOverlay message="Adding ..." />;
  }
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Title"
        style={styles.inputStyle}
        value={fileTitle}
        onChangeText={(text) => {
          updateInputValueHandler("fileTitle", text);
        }}
      />
      <TextInput
        mode="outlined"
        value={fileDescription}
        onChangeText={(text) => {
          updateInputValueHandler("fileDescription", text);
        }}
        activeOutlineColor={Colors.green500}
        label="Description"
        style={[styles.inputStyle, styles.paragraphStyle]}
      />
      <View style={styles.filecontainer}>
        {fileType === "photo" && (
          <Image source={{ uri: fileUri }} style={styles.image} />
        )}
        {fileType === "pdf" && (
          <Icon source="file-pdf-box" size={35} onPress={() => {}}></Icon>
        )}
        {fileType === "word" && <Icon source="file-word-box" size={35}></Icon>}
      </View>
      <CusButton onPress={submitHandler}>Save</CusButton>
    </View>
  );
}
export default FileAddingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  filecontainer: {
    width: "100%",
    height: "auto",
    backgroundColor: Colors.gray200,
    borderRadius: 10,
    paddingVertical:10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    objectFit: "cover",
    marginBottom: 15,
  },
  inputStyle: {
    backgroundColor: "white",
    marginBottom: 13,
  },
  paragraphStyle: {
    height: 100,
  },
  image: {
    width: 300,
    height: 300,
  },
});
