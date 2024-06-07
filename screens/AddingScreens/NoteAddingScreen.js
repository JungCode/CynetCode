import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { ItemsContext } from "../../store/items-context";
import CusButton from "../../components/CusButton";
function NoteAddingScreen() {
  const route = useRoute();
  const [noteTitle, setNoteTitle] = useState(
    route.params ? route.params.noteTitle : ""
  );
  const [noteText, setNoteText] = useState(
    route.params ? route.params.noteText : ""
  );
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [isStoring, setIsStoring] = useState(false);
  const navigation = useNavigation();
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "noteTitle":
        setNoteTitle(enteredValue);
        break;
      case "noteText":
        setNoteText(enteredValue);
        break;
    }
  }
  function submitHandler() {
    setIsStoring(true);
    const item = {
      noteTitle: noteTitle,
      noteText: noteText,
      userId: authCtx.userId,
      favorite: route.params ? route.params.favorite : false,
    };
    if (route.params) {
      itemsCtx.updateItem(route.params.id, item, "NoteItems");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Edited item successfull!", ToastAndroid.SHORT);
    } else {
      itemsCtx.storeItem(item, "note");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Added item successfull!", ToastAndroid.SHORT);
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
        value={noteTitle}
        onChangeText={(text) => {
          updateInputValueHandler("noteTitle", text);
        }}
      />
      <TextInput
        mode="outlined"
        value={noteText}
        onChangeText={(text) => {
          updateInputValueHandler("noteText", text);
        }}
        activeOutlineColor={Colors.green500}
        label="Note"
        style={[styles.inputStyle, styles.paragraphStyle]}
      />
      <CusButton onPress={submitHandler}> Save</CusButton>
    </View>
  );
}
export default NoteAddingScreen;
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
    height: 200,
    justifyContent: "flex-start",
    textAlignVertical: 'top', 
  },
});
