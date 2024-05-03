import {
  FlatList,
  Image,
  Linking,
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
import AccountAcordition from "../../components/Accordions/AccountAcordition";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";
import { ItemsContext } from "../../store/items-context";
import NoteAcordition from "../../components/Accordions/NoteAcordition";
import MyFabGroup from "../../components/MyFabGroup";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import FileAcordition from "../../components/Accordions/FileAcordition";

function Files() {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const [image, setImage] = useState(null);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    async function getItems() {
      setIsFetchedItems(true);
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId, "files");
      setFetchedItems(data);
      setIsFetchedItems(false);
    }
    getItems();
  }, [itemsCtx.refresh]);
  useEffect(() => {
    async function getItems() {
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId, "files");
      setFetchedItems(data);
    }
    getItems();
  }, [itemsCtx.refreshFavorite]);
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
  async function ImagePickerHandler() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("fileAddingScreen", { imgURI: result.assets[0].uri });
    }
    console.log({ imgURI: result.assets[0].uri });
  }
  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }

  if (fetchedItems.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your security store is empty</Text>
        <ScrollView></ScrollView>
        <MyFab name={"addingOptionsModal"} />
      </View>
    );
  }

  return (
    <PaperProvider>
      <BottomSheetModalProvider>
        <Pressable onPress={handleDismissModal} style={styles.container}>
          {/* Overlay */}
          {isBottomDisplay && <View style={styles.overlay} />}
          <FlatList
            data={fetchedItems}
            renderItem={({ item }) => (
              <FileAcordition
                handlePresentModal={handlePresentModal}
                value={item}
              >
              </FileAcordition>
            )}
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
            handleDismissModal={handleDismissModal}
            item={itemButtonSheetContent}
          ></ItemBottomSheetContent>
        </BottomSheetModal>
        <MyFabGroup onPress={ImagePickerHandler}></MyFabGroup>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </BottomSheetModalProvider>
    </PaperProvider>
  );
}

export default Files;

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
