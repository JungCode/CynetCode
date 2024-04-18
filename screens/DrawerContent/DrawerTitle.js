import { StyleSheet, Text, View } from "react-native";

function DrawerTitle({children}) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.drawerTitle}>{children}</Text>
    </View>
  );
}
export default DrawerTitle;
const styles = StyleSheet.create({
  titleContainer: {
    borderBottomColor: "#d1c9c9",
    borderBottomWidth: 1,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 20,
  },
});
