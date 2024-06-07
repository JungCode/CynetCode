import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker from Expo
function AddingItem({ name, iconName, navigationName }) {
  const navigation = useNavigation();
  function PressHandler() {
    if (navigationName === "filePicker") {
      FilePickerHandler();
    } else {
      return navigation.navigate(navigationName);
    }
  }
  async function FilePickerHandler() {
    const file = await DocumentPicker.getDocumentAsync({
      type: [
        "image/*",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    if (!file.canceled) {
      navigation.navigate("fileAddingScreen", file);
    }
    // console.log(file.assets[0]);
  }
  return (
    <Pressable
      onPress={PressHandler}
      style={styles.container}
      android_ripple={{ color: Colors.gray200 }}
    >
      <View style={styles.icon}>
        <Icon source={iconName} color="black" size={30} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}
export default AddingItem;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "transperent",
    paddingLeft: 45,
    height: 65,
    fontSize: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  text: {
    fontWeight: "400",
  },
});
