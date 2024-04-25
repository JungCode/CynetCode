import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import ItemBS from "./ItemBS";

function ItemBottomSheetContent({ item }) {
  return (
    <View>
      <View>
        <View></View>
        <View>
          <Text>This is item name</Text>
          <Text>this is url</Text>
        </View>
      </View>
      <Divider></Divider>
      <ItemBS source={"star-outline"} text={"Delete from favorite"}></ItemBS>
      <ItemBS source={"file-edit-outline"} text={"Edit"}></ItemBS>
      <ItemBS source={"share-variant-outline"} text={"Share"}></ItemBS>
      <ItemBS source={"content-copy"} text={"Copy all"}></ItemBS>
      <ItemBS source={"delete-outline"} text={"Delete"}></ItemBS>
      <ItemBS source={"block-helper"} text={"Cancel"}></ItemBS>
    </View>
  );
}

export default ItemBottomSheetContent;

const styles = StyleSheet.create({

})