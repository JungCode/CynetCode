import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyFab from "../../components/MyFab";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import ItemAcordition from "../../components/Accordions/ItemAcordition";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";

import { ItemsContext } from "../../store/items-context";
function AllItemScreen({ onPress }) {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
  useEffect(() => {
    async function getItems() {
      setIsFetchedItems(true);
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId);
      setFetchedItems(data);
      setIsFetchedItems(false);
    }
    getItems();
  }, [itemsCtx.refresh]);
  // bottomsheet js
  const bottomSheetModalRef = useRef(null);
  const spanPoints = ["50%"];
  function handlePresentModal(item) {
    setItemButtonSheetContent(item);
    setBottomDisplay(true);
    bottomSheetModalRef.current?.present();
  }
  function handleDismissModal() {
    setBottomDisplay(false);
    bottomSheetModalRef.current?.dismiss();
  }

  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }

  if (!fetchedItems) {
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
        {/* Overlay */}
        {isBottomDisplay && <View style={styles.overlay} />}
        <FlatList
          data={fetchedItems}
          renderItem={({ item }) => (
            <ItemAcordition
              handlePresentModal={handlePresentModal}
              handleDismissModal={handleDismissModal}
              value={item}>
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
        <ItemBottomSheetContent
          handleDismissModal={handleDismissModal}
          item={itemButtonSheetContent}></ItemBottomSheetContent>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu sắc và độ mờ của overlay
    zIndex: 1, // Đảm bảo overlay ở trên cùng
  },
});
