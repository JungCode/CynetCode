import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import { useContext, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingOverlay from "../../components/LoadingOverlay";
import { ItemsContext } from "../../store/items-context";
import { ToastAndroid } from "react-native";
import CryptoJS from "react-native-crypto-js";

function WebsiteAddingScreen() {
  const route = useRoute();
  const [webURL, setWebURL] = useState(route.params ? route.params.webURL : "");
  const [webName, setWebName] = useState(
    route.params ? route.params.webName : ""
  );
  const [userName, setUserName] = useState(
    route.params ? route.params.userName : ""
  );
  const [password, setPassword] = useState(
    route.params ? route.params.password : ""
  );
  const [description, setDescription] = useState(
    route.params ? route.params.description : ""
  );
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [isStoring, setIsStoring] = useState(false);
  const navigation = useNavigation();
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "webURL":
        setWebURL(enteredValue);
        break;
      case "webName":
        setWebName(enteredValue);
        break;
      case "userName":
        setUserName(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      case "description":
        setDescription(enteredValue);
        break;
    }
  }
  function submitHandler() {
    setIsStoring(true);
    let ciphertext = CryptoJS.AES.encrypt(
      password,
      authCtx.userId
    ).toString();

    const item = {
      webURL: webURL,
      webName: webName,
      userName: userName,
      password: ciphertext,
      description: description,
      userId: authCtx.userId,
      favorite: false,
    };
    if (route.params) {
      itemsCtx.updateItem(route.params.id, item, "webItems");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Edited item successfull!", ToastAndroid.SHORT);
    } else {
      // itemsCtx.storeItem(item, "web");
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
        label="Web URL"
        style={styles.inputStyle}
        value={webURL}
        onChangeText={(text) => {
          updateInputValueHandler("webURL", text);
        }}
        onBlur={() => {
          const name = webURL.split(".");
          const capitalizedName =
            name[0].charAt(0).toUpperCase() + name[0].slice(1);
          updateInputValueHandler("webName", capitalizedName);
        }}
      />
      <TextInput
        mode="outlined"
        value={webName}
        onChangeText={(text) => {
          updateInputValueHandler("webName", text);
        }}
        activeOutlineColor={Colors.green500}
        label="Name"
        style={styles.inputStyle}
      />
      <View style={styles.accountContainer}>
        <Text style={styles.title}>Account</Text>
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.green500}
          label="User Name"
          style={styles.inputStyle}
          value={userName}
          onFocus={() => {}}
          onChangeText={(text) => {
            updateInputValueHandler("userName", text);
          }}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.green500}
          label="Password"
          style={styles.inputStyle}
          value={password}
          onChangeText={(text) => {
            updateInputValueHandler("password", text);
          }}
        />
        <TextInput
          mode="outlined"
          activeOutlineColor={Colors.green500}
          label="Description"
          style={styles.inputStyle}
          value={description}
          onChangeText={(text) => {
            updateInputValueHandler("description", text);
          }}
        />
        <Button onPress={submitHandler} title="Save" />
      </View>
    </View>
  );
}
export default WebsiteAddingScreen;
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
  accountContainer: {
    backgroundColor: "#ebeaea",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 15,
  },
  title: {
    marginBottom: 20,
    fontSize: 14,
    color: Colors.gray300,
  },
});
