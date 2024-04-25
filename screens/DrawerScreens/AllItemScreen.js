import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MyFab from "../../components/MyFab";
import { useContext, useEffect, useRef, useState } from "react";
import { fetchItems } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import Item from "../../components/Item";
import LoadingOverlay from "../../components/LoadingOverlay";
import ItemAcordition from "../../components/Accordions/ItemAcordition";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";

function AllItemScreen({ onPress }) {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function getItems() {
      setIsFetchedItems(true);
      const items = await fetchItems(authCtx.userId);
      setFetchedItems(items);
      setIsFetchedItems(false);
    }
    getItems();
  }, [authCtx]);

  // bottomsheet js
  const bottomSheetModalRef = useRef(null);
  const spanPoints = ["48%"];
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }
  function handleDismissModal() {
    bottomSheetModalRef.current?.dismiss();
  }

  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }

  if (!Array.isArray(fetchedItems) || fetchedItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your security store is empty</Text>
        <ScrollView></ScrollView>
        <MyFab onPress={onPress} />
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleDismissModal} style={styles.container}>
        <FlatList
          data={fetchedItems}
          renderItem={({ item }) => (
            <ItemAcordition
              handlePresentModal={handlePresentModal}
              // handleDismissModal={handleDismissModal}
              value={item}
            >
              {item.webName}
            </ItemAcordition>
          )}
          keyExtractor={(item) => item.id}
        />
        <MyFab onPress={onPress} />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={spanPoints}
        onDismiss={handleDismissModal}
        // onChange={handleSheetChanges}
      >
        <ItemBottomSheetContent item></ItemBottomSheetContent>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

export default AllItemScreen;

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
