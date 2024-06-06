import {
  FlatList,
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
import FileAcordition from "../../components/Accordions/FileAcordition";
import { off, onValue, ref } from "firebase/database";
import { db } from "../../util/https-fetch";
import CryptoJS from "react-native-crypto-js";
import AddressAcordition from "../../components/Accordions/AddressAcordition";

function AllItemScreen() {
  const [fetchedAccounts, setFetchedAccounts] = useState([]);
  const [fetchedApps, setFetchedApps] = useState([]);
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [fetchedAddress, setFetchedAddress] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
  useEffect(() => {
    setIsFetchedItems(true);
    const accountsRef = ref(db, "webItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        let bytes = CryptoJS.AES.decrypt(
          childSnapshot.val().password,
          authCtx.userId
        );
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        dataArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
          password: originalText,
        });
      });
      const filteredItems = dataArray.filter(
        (item) => item.userId === authCtx.userId
      );
      setFetchedAccounts(filteredItems);
    };
    onValue(accountsRef, onValueChangeAccounts);

    // Ngắt kết nối listener khi component unmount
    return () => {
      off(accountsRef, onValueChangeAccounts);
    };
  }, []);
  useEffect(() => {
    const accountsRef = ref(db, "appItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeApps = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        let bytes = CryptoJS.AES.decrypt(
          childSnapshot.val().password,
          authCtx.userId
        );
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        dataArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
          password: originalText,
        });
      });
      const filteredItems = dataArray.filter(
        (item) => item.userId === authCtx.userId
      );
      setFetchedApps(filteredItems);
    };
    onValue(accountsRef, onValueChangeApps);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(accountsRef, onValueChangeApps);
    };
  }, []);

  useEffect(() => {
    const notesRef = ref(db, "NoteItems");

    const onValueChangeNotes = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      const filteredItems = dataArray.filter(
        (item) => item.userId === authCtx.userId
      );
      setFetchedNotes(filteredItems);
    };

    onValue(notesRef, onValueChangeNotes);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(notesRef, onValueChangeNotes);
    };
  }, []);
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
      setFetchedFiles(filteredItems);
      setIsFetchedItems(false);
    };

    onValue(filesRef, onValueChangeNotes);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(filesRef, onValueChangeNotes);
    };
  }, []);
  useEffect(() => {
    setIsFetchedItems(true);
    const accountsRef = ref(db, "addressItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAddress = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      const filteredItems = dataArray.filter(
        (item) => item.userId === authCtx.userId
      );
      setFetchedAddress(filteredItems);
      setIsFetchedItems(false);
    };
    onValue(accountsRef, onValueChangeAddress);

    // Ngắt kết nối listener khi component unmount
    return () => {
      off(accountsRef, onValueChangeAddress);
    };
  }, []);
  // useEffect(() => {
  //   async function getItems() {
  //     const data = await itemsCtx.fetchItemsCtx(authCtx.userId, "allItems");
  //     setFetchedItems(data);
  //   }
  //   getItems();
  // }, [itemsCtx.refreshFavorite]);
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
  function openInBrowserHandler(webURL) {
    Linking.openURL("https://" + webURL);
  }
  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }

  if (
    fetchedFiles.length == 0 &&
    fetchedAccounts.length == 0 &&
    fetchedNotes.length == 0 &&
    isFetchedItems == false
  ) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your security store is empty</Text>
        <ScrollView></ScrollView>
        <MyFab name={"addingOptionsModal"} />
      </View>
    );
  }
  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleDismissModal} style={styles.container}>
        {/* Overlay */}
        {isBottomDisplay && <View style={styles.overlay} />}

        <FlatList
          data={[
            ...fetchedAccounts,
            ...fetchedApps,
            ...fetchedNotes,
            ...fetchedFiles,
            ...fetchedAddress,
          ]}
          renderItem={({ item }) =>
            item.webURL !== undefined ? (
              <AccountAcordition
                handlePresentModal={handlePresentModal}
                openInBrowser={openInBrowserHandler}
                handleDismissModal={handleDismissModal}
                value={item}
              >
                {item.webName}
              </AccountAcordition>
            ) : item.appName !== undefined ? (
              <AccountAcordition
                handlePresentModal={handlePresentModal}
                openInBrowser={openInBrowserHandler}
                handleDismissModal={handleDismissModal}
                value={item}
              >
                {item.appName}
              </AccountAcordition>
            ) : item.noteTitle !== undefined ? (
              <NoteAcordition
                handlePresentModal={handlePresentModal}
                value={item}
              >
                {item.noteTitle}
              </NoteAcordition>
            ) : item.fileName !== undefined ? (
              <FileAcordition
                handlePresentModal={handlePresentModal}
                value={item}
                imageName={item.fileName}
              ></FileAcordition>
            ) : item.addressName !== undefined ? (
              <AddressAcordition
                handlePresentModal={handlePresentModal}
                value={item}
                imageName={item.addressName}
              ></AddressAcordition>
            ) : null
          }
          keyExtractor={(item) => item.id}
        />
      </Pressable>
      <MyFab name={"addingOptionsModal"} />
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
