import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

function ItemBS({ source, text }) {
  return (
    <Pressable>
      <View style={styles.container}>
        <Icon style={styles.icon} source={source} size={30}></Icon>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default ItemBS;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  icon: {
    padding:20,
  },
  text:{
    paddingHorizontal:20,
    fontSize:18,
  }
});
