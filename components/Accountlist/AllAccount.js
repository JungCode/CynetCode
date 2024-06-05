import { FlatList, Linking, Pressable, StyleSheet, View } from "react-native";
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

import { off, onValue, ref } from "firebase/database";
import { db } from "../../util/https-fetch";
import { Buffer } from "buffer";

function AllAccount() {
  const [fetchedAccounts, setFetchedAccounts] = useState([]);
  const [fetchedApps, setFetchedApps] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const authCtx = useContext(AuthContext);
  const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
  useEffect(() => {
    setIsFetchedItems(true);
    const accountsRef = ref(db, "webItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        const decodedPasswordBuffer = Buffer.from(
          childSnapshot.val().password,
          "base64"
        );
        // Convert Buffer back to string
        const decodedPassword = decodedPasswordBuffer.toString("utf-8");

        dataArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
          password: decodedPassword,
        });
      });
      const filteredItems = dataArray.filter(
        (item) => item.userId === authCtx.userId
      );
      setFetchedAccounts(filteredItems);
    };
    onValue(accountsRef, onValueChangeAccounts);

    // Ngắt kết nối listener khi component unmount
    setIsFetchedItems(false);
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
        const decodedPasswordBuffer = Buffer.from(
          childSnapshot.val().password,
          "base64"
        );
        // Convert Buffer back to string
        const decodedPassword = decodedPasswordBuffer.toString("utf-8");

        dataArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
          password: decodedPassword,
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
  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleDismissModal} style={styles.container}>
        {/* Overlay */}
        {isBottomDisplay && <View style={styles.overlay} />}

        <FlatList
          data={[...fetchedAccounts, ...fetchedApps]}
          renderItem={({ item }) => (
            <AccountAcordition
              handlePresentModal={handlePresentModal}
              openInBrowser={openInBrowserHandler}
              // handleDismissModal={handleDismissModal}
              value={item}
            >
              {item.webName}
            </AccountAcordition>
          )}
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
export default AllAccount;
