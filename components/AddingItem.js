import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
function AddingItem({ name, iconName }) {
  const navigation = useNavigation();
  function PressHandler() {
    return navigation.navigate("websiteAddingScreen");
  }

  return (
    <Pressable
      onPress={PressHandler}
      style={styles.container}
      android_ripple={{ color: Colors.gray200 }}
    >
      <Ionicons name={iconName} color="black" size={30} style={styles.icon} />
      <Text>{name}</Text>
    </Pressable>
  );
}
export default AddingItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingLeft: 45,
    height: 65,
    fontSize: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
});
