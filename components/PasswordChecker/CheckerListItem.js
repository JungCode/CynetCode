import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import Colors from "../../constants/Colors";

function CheckerListItem({ icon, color, webname, account, onPress, appname }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      android_ripple={{ color: "rgba(0, 0, 0, 0.2)" }}
    >
      <View style={styles.subcontainer}>
        <Icon source={icon} color={color} size={35}></Icon>
        <View style={styles.textContainer}>
          {webname != undefined ? (
            <Text style={styles.text}>{webname}</Text>
          ) : (
            <Text style={styles.text}>{appname}</Text>
          )}
          <Text style={styles.sub}>{account}</Text>
        </View>
      </View>
      <Icon size={24} source="chevron-right"></Icon>
    </Pressable>
  );
}

export default CheckerListItem;
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  subcontainer: {
    flexDirection: "row",
    padding: 10,
  },
  textContainer: {
    marginLeft: 20,
  },
  text: {
    fontSize: 18,
    color: Colors.black100,
    fontWeight: "700",
  },
  sub: {
    fontSize: 15,
    color: Colors.gray300,
  },
});
