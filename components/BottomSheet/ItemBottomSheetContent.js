import { Image, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import ItemBS from "./ItemBS";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../store/items-context";

function ItemBottomSheetContent({ item, setIsFetchedItems }) {
  const navigation = useNavigation();
  const itemsCtx = useContext(ItemsContext);
  const [toggleButton, setToggleButton] = useState(item.favorite);
  function deleteHandler() {
    if (item.noteTitle !== undefined) {
      itemsCtx.deleteItem(item.id, "NoteItems");
    }
    if (item.webURL !== undefined) {
      itemsCtx.deleteItem(item.id, "webItems");
    }
  }
  function addHandler() {
    if (item.noteTitle !== undefined) {
      navigation.navigate("noteAddingScreen", item);
    }
    if (item.webURL !== undefined) {
      navigation.navigate("websiteAddingScreen", item);
    }
  }
  function favoriteHandler() {
    delete item.imgURL;
    item.favorite = !item.favorite;
    if (item.noteTitle !== undefined) {
      itemsCtx.updateFavoriteItem(item.id, item, "NoteItems");
    }
    if (item.webURL !== undefined) {
      itemsCtx.updateFavoriteItem(item.id, item, "webItems");
    }
    setToggleButton(!toggleButton);
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
      {toggleButton ? (
        <ItemBS
          source={"star"}
          text={"Delete from favorite"}
          onPress={favoriteHandler}
        ></ItemBS>
      ) : (
        <ItemBS
          source={"star-outline"}
          text={"Add to favorite"}
          onPress={favoriteHandler}
        ></ItemBS>
      )}
      <ItemBS
        onPress={addHandler}
        source={"file-edit-outline"}
        text={"Edit"}
      ></ItemBS>
      <ItemBS source={"share-variant-outline"} text={"Share"}></ItemBS>
      <ItemBS source={"content-copy"} text={"Copy all"}></ItemBS>
      <ItemBS
        onPress={deleteHandler}
        source={"delete-outline"}
        text={"Delete"}
      ></ItemBS>
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
