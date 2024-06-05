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
import { off, onValue, ref } from "firebase/database";
import { db } from "../../util/https-fetch";
import FileAcordition from "../../components/Accordions/FileAcordition";
import CryptoJS from "react-native-crypto-js";

function FavoriteScreen() {
  const [fetchedAccounts, setFetchedAccounts] = useState([]);
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [fetchedApps, setFetchedApps] = useState([]);
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
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
        (item) => item.userId === authCtx.userId && item.favorite
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
        (item) => item.userId === authCtx.userId && item.favorite
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
        (item) => item.userId === authCtx.userId && item.favorite
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
        (item) => item.userId === authCtx.userId && item.favorite
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
          ]}
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
                {item.webName}
              </NoteAcordition>
            ) : item.fileName !== undefined ? (
              <FileAcordition
                handlePresentModal={handlePresentModal}
                imageName={item.fileName}
                value={item}
              ></FileAcordition>
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
          handleDismissModal={handleDismissModal}
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
