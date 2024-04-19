import { Button, StyleSheet, Text, View } from "react-native";
import AddingItem from "../../components/AddingItem";

function AddingOptionsModal({ navigation }) {
  return (
    <View style={styles.container}>
      <AddingItem name="Acount" iconName="person-circle-outline" />
      <AddingItem name="Bank Account" iconName="card-outline" />
      <AddingItem name="Picture" iconName="person-circle-outline" />
      <AddingItem name="Documents" iconName="document-outline" />
      <AddingItem name="Address" iconName="home-outline" />
      <AddingItem name="Notes" iconName="reader-outline" />
      <AddingItem name="Folder" iconName="person-circle-outline" />
    </View>
  );
}
export default AddingOptionsModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
