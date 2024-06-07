import { Button, StyleSheet, Text, View } from "react-native";
import AddingItem from "../../components/AddingItem";
import AddingItemAcordition from "../../components/AddingItemAcordition";

function AddingOptionsModal({ navigation }) {
  return (
    <View style={styles.container}>
      <AddingItemAcordition name="Acount" icon="account-circle-outline">
        <AddingItem
          name="Website"
          iconName="web"
          navigationName="websiteAddingScreen"
        ></AddingItem>
        <AddingItem
          name="Application"
          iconName="view-grid-outline"
          navigationName="appAddingScreen"
        ></AddingItem>
      </AddingItemAcordition>
      <AddingItemAcordition name="File" icon="file-outline">
        <AddingItem name="Camera" iconName="camera-outline"></AddingItem>
        <AddingItem
          name="Gallery"
          iconName="file-image"
          navigationName="filePicker"
        ></AddingItem>
      </AddingItemAcordition>
      <AddingItem
        name="Address"
        iconName="town-hall"
        navigationName="addressAddingScreen"
      />
      <AddingItem
        name="Notes"
        iconName="notebook-outline"
        navigationName="noteAddingScreen"
      />
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
