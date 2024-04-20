import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
function HeaderCloseButton() {
  const navigation = useNavigation();
  return (
    <Pressable
      android_ripple={{ color: Colors.gray200, borderless: true }}
      style={styles.container}
      onPress={() => navigation.navigate("drawerScreen")}
    >
      <Ionicons style={styles.icon} name="close" size={27} color="black" />
    </Pressable>
  );
}
export default HeaderCloseButton;
const styles = StyleSheet.create({
  container: {
    marginRight: 25,
    borderRadius: 50,
  },
  icon: {
    borderRadius: 50,
  },
});
