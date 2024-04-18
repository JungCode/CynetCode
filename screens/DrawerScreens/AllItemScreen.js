import { ScrollView, StyleSheet, Text, View } from "react-native";
import MyFab from "../../components/MyFab";
function AllItemScreen() {
  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
      <MyFab />
    </View>
  );
}

export default AllItemScreen;
const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    flex: 1,
  }
})