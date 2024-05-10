import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import Colors from "../../constants/Colors";

function CheckerListNotify({ text, icon, color }) {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={35} color={color}></Icon>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default CheckerListNotify;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.graycontent,
    paddingHorizontal: 20,
    paddingVertical:10,
    borderRadius: 10,
    flexDirection:"row",
    alignItems:"center",
    marginHorizontal:10,
  },
  text:{
    fontSize: 18,
    color: Colors.gray62,
    marginLeft: 20,
  }
});
