import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";
import { ItemsContext } from "../../store/items-context";
import NoteAcordition from "../../components/Accordions/NoteAcordition";
import AccountAcordition from "../../components/Accordions/AccountAcordition";
function FavoriteScreen() {
  const [fetchedFavoritesItems, setFetchedFavoritesItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
  useEffect(() => {
    setIsFetchedItems(true);
    async function getItems() {
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId, "favorites");
      setFetchedFavoritesItems(data);
      setIsFetchedItems(false);
    }
    getItems();
  }, []);
  useEffect(() => {
    async function getItems() {
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId, "favorites");
      setFetchedFavoritesItems(data);
    }
    getItems();
  }, [itemsCtx.refreshFavorite]);
  // bottomsheet js
  const bottomSheetModalRef = useRef(null);
  const spanPoints = ["48%"];
  function handlePresentModal(item) {
    setItemButtonSheetContent(item);
    bottomSheetModalRef.current?.present();
  }
  function handleDismissModal() {
    bottomSheetModalRef.current?.dismiss();
  }
  function openInBrowserHandler(webURL) {
    Linking.openURL("https://" + webURL);
  }
  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }
  if (fetchedFavoritesItems.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your security store is empty</Text>
        <ScrollView></ScrollView>
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleDismissModal} style={styles.container}>
        <FlatList
          data={fetchedFavoritesItems}
          renderItem={({ item }) =>
            item.webURL !== undefined ? (
              <AccountAcordition
                handlePresentModal={handlePresentModal}
                openInBrowser={openInBrowserHandler}
                // handleDismissModal={handleDismissModal}
                value={item}
              >
                {item.webName}
              </AccountAcordition>
            ) : item.noteTitle !== undefined ? (
              <NoteAcordition
                handlePresentModal={handlePresentModal}
                value={item}
              >
                {item.webName}
              </NoteAcordition>
            ) : null
          }
          keyExtractor={(item) => item.id}
        />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={spanPoints}
        onDismiss={handleDismissModal}
        // onChange={handleSheetChanges}
      >
        <ItemBottomSheetContent
          item={itemButtonSheetContent}
        ></ItemBottomSheetContent>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
  },
});
