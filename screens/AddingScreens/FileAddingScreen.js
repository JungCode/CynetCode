import { Button, Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { ItemsContext } from "../../store/items-context";
function FileAddingScreen() {
  const route = useRoute();
  const [fileTitle, setFileTitle] = useState(
    route.params ? route.params.fileTitle : ""
  );
  const [fileDescription, setFileDescription] = useState(
    route.params ? route.params.fileDescription : ""
  );
  const [imgURI, setImgURI] = useState(route.params.imgURI);
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
      case "imgURI":
        setImgURI(enteredValue);
        break;
    }
  }
  function submitHandler() {
    setIsStoring(true);
    const item = {
      fileTitle: fileTitle,
      fileDescription: fileDescription,
      imgURI: imgURI,
      userId: authCtx.userId,
      favorite: false,
    };
    if (route.params.fileTitle !== undefined) {
      // itemsCtx.updateItem(route.params.id, item, "NoteItems");
      // navigation.navigate("drawerScreen");
    } else {
      itemsCtx.storeItem(item, "file");
      navigation.navigate("drawerScreen");
    }
    setIsStoring(false);
  }
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
      <Image source={{ uri: imgURI }} style={styles.image} />
      <Button onPress={submitHandler} title="Save" />
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
  inputStyle: {
    backgroundColor: "white",
    marginBottom: 13,
  },
  paragraphStyle: {
    height: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});
