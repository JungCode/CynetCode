import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
function DrawerLabel({ title, iconName, quantity }) {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={24} color="black" style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.quantity}>{quantity}</Text>
    </View>
  );
}
export default DrawerLabel;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 4,
    height: "100%", 
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    marginRight: "auto",
  },
  icon: {
    marginRight: 10,
  },
  quantity: {},
});
