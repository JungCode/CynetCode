import { Image, StyleSheet, Text, View } from "react-native";
import { Divider, Icon } from "react-native-paper";
import ItemBS from "./ItemBS";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../store/items-context";
import { ToastAndroid } from "react-native";
import CryptoJS from "react-native-crypto-js";
import { AuthContext } from "../../store/auth-context";
function ItemBottomSheetContent({
  item,
  setIsFetchedItems,
  icon,
  handleDismissModal,
}) {
  const navigation = useNavigation();
  const itemDB = { ...item };
  const itemsCtx = useContext(ItemsContext);
  const authCtx = useContext(AuthContext);
  const [toggleButton, setToggleButton] = useState(item.favorite);
  const name = item.appName
    ? item.appName
    : item.webName
    ? item.webName
    : item.noteTitle
    ? item.noteTitle
    : null;
  const secondName = item.appName
    ? "Application"
    : item.webName
    ? item.webURL
    : item.noteTitle
    ? "Note"
    : null;
  function deleteHandler() {
    if (item.noteTitle !== undefined) {
      itemsCtx.deleteItem(item.id, "NoteItems",null);
    }
    if (item.webURL !== undefined) {
      itemsCtx.deleteItem(item.id, "webItems",null);
    }
    if (itemDB.appName !== undefined) {
      itemsCtx.deleteItem(item.id, "appItems",null);
    }
    if (itemDB.fileName !== undefined) {
      itemsCtx.deleteItem(item.id, "FileItems",itemDB.fileName);
    }
    if (itemDB.addressName !== undefined) {
      itemsCtx.deleteItem(item.id, "addressItems",null);
    }
    ToastAndroid.show("Deleted item!", ToastAndroid.SHORT);
    handleDismissModal();
  }
  function addHandler() {
    if (item.noteTitle !== undefined) {
      navigation.navigate("noteAddingScreen", item);
    }
    if (item.webURL !== undefined) {
      navigation.navigate("websiteAddingScreen", item);
    }
    if (item.appName !== undefined) {
      navigation.navigate("appAddingScreen", item);
    }
    if (item.addressName !== undefined) {
      navigation.navigate("addressAddingScreen", item);
    }
    if (item.fileName !== undefined) {
      navigation.navigate("fileAddingScreen", item);
    }
    handleDismissModal();
  }
  function favoriteHandler() {
    delete itemDB.imgURL;
    itemDB.favorite = !itemDB.favorite;
    if (itemDB.noteTitle !== undefined) {
      itemsCtx.updateFavoriteItem(itemDB.id, itemDB, "NoteItems");
    }
    if (itemDB.addressName !== undefined) {
      itemsCtx.updateFavoriteItem(itemDB.id, itemDB, "addressItems");
    }
    if (itemDB.webURL !== undefined) {
      let ciphertext = CryptoJS.AES.encrypt(
        itemDB.password,
        authCtx.userId
      ).toString();
      itemDB.password = ciphertext;
      itemsCtx.updateFavoriteItem(itemDB.id, itemDB, "webItems");
    }
    if (itemDB.fileName !== undefined) {
      itemsCtx.updateFavoriteItem(itemDB.id, itemDB, "FileItems");
    }
    if (itemDB.appName !== undefined) {
      let ciphertext = CryptoJS.AES.encrypt(
        itemDB.password,
        authCtx.userId
      ).toString();
      itemDB.password = ciphertext;
      itemsCtx.updateFavoriteItem(itemDB.id, itemDB, "appItems");
    }

    handleDismissModal();
    if (!toggleButton) {
      ToastAndroid.show("Added to favorites!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Removed from favorites!", ToastAndroid.SHORT);
    }
    setToggleButton(!toggleButton);
  }
  return (
    <View>
      <View style={styles.titleView}>
        <View style={styles.imgStyle}>
          {item.webURL ? (
            <Image
              source={{
                uri: item.icon,
              }}
              style={styles.imgStyle}
            />
          ) : (
            <Icon source={item.icon} size={35} style={styles.imgStyle}></Icon>
          )}
        </View>
        <View style={styles.textTitleContainer}>
          <Text style={styles.textTitle}>{name}</Text>
          <Text style={styles.suburl}>{secondName}</Text>
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
      <ItemBS
        onPress={handleDismissModal}
        source={"block-helper"}
        text={"Cancel"}
      ></ItemBS>
    </View>
  );
}

export default ItemBottomSheetContent;

const styles = StyleSheet.create({
  imgStyle: {
    width: 35,
    height: 35,
    margin: 20,
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTitleContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  textTitle: {
    fontSize: 20,
    color: "black",
  },
  suburl: {
    fontSize: 18,
    color: Colors.gray300,
  },
});
