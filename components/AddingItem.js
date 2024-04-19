import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function AddingItem({ name, iconName }) {
  return (
    <Pressable style={styles.container} android_ripple="#373131">
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
