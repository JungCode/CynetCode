import { Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import ItemBS from "./ItemBS";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ItemsContext } from "../../store/items-context";

function ItemBottomSheetContent({ item }) {
  const navigation = useNavigation();
  const itemsCtx = useContext(ItemsContext);
  function deleteHandler() {
    itemsCtx.deleteItem(item.id);
  }
  return (
    <View>
      <View>
        <View></View>
        <View>
          <Text>{item.webName}</Text>
          <Text>{item.webURL}</Text>
          <Image source={{ uri: item.imgURL }} style={styles.imgStyle} />
        </View>
      </View>
      <Divider></Divider>
      <ItemBS source={"star-outline"} text={"Delete from favorite"}></ItemBS>
      <ItemBS
        onPress={() => navigation.navigate("websiteAddingScreen", item)}
        source={"file-edit-outline"}
        text={"Edit"}
      ></ItemBS>
      <ItemBS source={"share-variant-outline"} text={"Share"}></ItemBS>
      <ItemBS source={"content-copy"} text={"Copy all"}></ItemBS>
      <ItemBS onPress={deleteHandler} source={"delete-outline"} text={"Delete"}></ItemBS>
      <ItemBS source={"block-helper"} text={"Cancel"}></ItemBS>
    </View>
  );
}

export default ItemBottomSheetContent;

const styles = StyleSheet.create({
  imgStyle: {
    width: 15,
    height: 15,
  },
});
