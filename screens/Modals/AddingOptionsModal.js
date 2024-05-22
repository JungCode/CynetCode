import { Button, StyleSheet, Text, View } from "react-native";
import AddingItem from "../../components/AddingItem";
import AddingItemAcordition from "../../components/AddingItemAcordition";

function AddingOptionsModal({ navigation }) {
  return (
    <View style={styles.container}>
      <AddingItemAcordition name="Acount" icon="account-circle-outline">
        <AddingItem name="Website" iconName="web"></AddingItem>
        <AddingItem
          name="Application"
          iconName="view-grid-outline"></AddingItem>
        <AddingItem name="Other" iconName="view-grid-plus-outline"></AddingItem>
      </AddingItemAcordition>
      <AddingItem name="Bank Account" iconName="credit-card-outline" />
      <AddingItemAcordition name="File" icon="file-outline">
        <AddingItem name="Camera" iconName="camera-outline"></AddingItem>
        <AddingItem name="Gallery" iconName="file-image"></AddingItem>
      </AddingItemAcordition>
      <AddingItem name="Address" iconName="town-hall" />
      <AddingItem name="Notes" iconName="notebook-outline" navigationName="" />
      <AddingItem name="Folder" iconName="folder-outline" />
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
