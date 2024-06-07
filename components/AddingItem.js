import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-paper";
function AddingItem({ name, iconName, navigationName }) {
  const navigation = useNavigation();
  function PressHandler() {
    return navigation.navigate(navigationName);
  }

  return (
    <Pressable
      onPress={PressHandler}
      style={styles.container}
      android_ripple={{ color: Colors.gray200 }}>
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
