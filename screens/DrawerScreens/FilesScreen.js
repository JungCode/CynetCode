import {
    FlatList,
    Image,
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
  import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from "@gorhom/bottom-sheet";
  import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";
  import { ItemsContext } from "../../store/items-context";
  import * as DocumentPicker from "expo-document-picker"; // Import DocumentPicker from Expo
  import MyFabGroup from "../../components/MyFabGroup";
  import { useNavigation } from "@react-navigation/native";
  import { PaperProvider } from "react-native-paper";
  import FileAcordition from "../../components/Accordions/FileAcordition";
  import { app, firebaseConfig } from "../../util/https-fetch";
  
  import { off, onValue, ref } from "firebase/database";
  import { db } from "../../util/https-fetch";
  
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
      const filesRef = ref(db, "FileItems");
  
      const onValueChangeNotes = (snapshot) => {
        const dataArray = [];
        snapshot.forEach((childSnapshot) => {
          dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        const filteredItems = dataArray.filter(
          (item) => item.userId === authCtx.userId
        );
        setFetchedItems(filteredItems);
        setIsFetchedItems(false);
      };
  
      onValue(filesRef, onValueChangeNotes);
      // Ngắt kết nối listener khi component unmount
      return () => {
        off(filesRef, onValueChangeNotes);
      };
    }, []);
  
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
    async function FilePickerHandler() {
      const file = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      });
  
      if (!file.canceled) {
        navigation.navigate("fileAddingScreen", file);
      }
      // console.log(file.assets[0]);
    }
    if (isFetchedItems) {
      return <LoadingOverlay message="Loading..." />;
    }
  
    if (fetchedItems.length == 0) {
      return (
        <PaperProvider>
          <View style={styles.container}>
            <Text style={styles.title}>Your security store is empty</Text>
            <ScrollView></ScrollView>
            <MyFabGroup onPress={FilePickerHandler}></MyFabGroup>
          </View>
        </PaperProvider>
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
                  imageName={item.fileName}
                ></FileAcordition>
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
          <MyFabGroup onPress={FilePickerHandler}></MyFabGroup>
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
  