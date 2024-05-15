import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import Colors from "../../constants/Colors";

function CheckerDetail({ weak, compromised, duplicate, good }) {
  return (
    <View style={styles.container}>
      {compromised ? (
        <View style={styles.content}>
          <Icon
            source="lock-open-variant"
            size={40}
            color={Colors.red100}></Icon>
          <Text style={styles.text}>Password is Compromised</Text>
        </View>
      ) : null}
      {weak ? (
        <View style={styles.content}>
          <Icon source="alert-outline" size={40} color={Colors.red100}></Icon>
          <Text style={styles.text}>Password is weak</Text>
        </View>
      ) : null}
      {duplicate ? (
        <View style={styles.content}>
          <Icon
            source="checkbox-multiple-blank-outline"
            size={40}
            color={Colors.yellow100}></Icon>
          <Text style={styles.text}>Password is duplicated</Text>
        </View>
      ) : null}
      {good ? (
        <View style={styles.content}>
          <Icon
            source="check-circle-outline"
            size={40}
            color={Colors.green500}></Icon>
          <Text style={styles.text}>Password is good</Text>
        </View>
      ) : null}
    </View>
  );
}

export default CheckerDetail;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.graycontent,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    marginBottom:5,
    alignItems:"center"
  },
  text: {
    fontSize: 20,
    color: Colors.black100,
    fontWeight:"400",
    marginLeft:20,
  },
});
