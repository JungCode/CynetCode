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
  import NoteAcordition from "../../components/Accordions/NoteAcordition";
  import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from "@gorhom/bottom-sheet";
  import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";
  
  import { ItemsContext } from "../../store/items-context";
  import { off, onValue, ref } from "firebase/database";
  import { db } from "../../util/https-fetch";
  function NoteScreen() {
    const [fetchedNotes, setFetchedNotes] = useState([]);
    const [isFetchedItems, setIsFetchedItems] = useState(false);
    const authCtx = useContext(AuthContext);
    const itemsCtx = useContext(ItemsContext);
    const [itemButtonSheetContent, setItemButtonSheetContent] = useState("");
    useEffect(() => {
      setIsFetchedItems(true);
      const accountsRef = ref(db, "NoteItems");
      // Lắng nghe sự thay đổi trong Realtime Database
      const onValueChangeNotes = (snapshot) => {
        const dataArray = [];
        snapshot.forEach((childSnapshot) => {
          dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        const filteredItems = dataArray.filter(
          (item) => item.userId === authCtx.userId
        );
        setFetchedNotes(filteredItems);
        setIsFetchedItems(false);
      };
      onValue(accountsRef, onValueChangeNotes);
  
      // Ngắt kết nối listener khi component unmount
      return () => {
        off(accountsRef, onValueChangeNotes);
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
    if (isFetchedItems) {
      return <LoadingOverlay message="Loading..." />;
    }
  
    if (fetchedNotes.length == 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Your security store is empty</Text>
          <ScrollView></ScrollView>
          <MyFab name={"noteAddingScreen"} />
        </View>
      );
    }
    return (
      <BottomSheetModalProvider>
        <Pressable onPress={handleDismissModal} style={styles.container}>
          <FlatList
            data={fetchedNotes}
            renderItem={({ item }) => (
              <NoteAcordition
                handlePresentModal={handlePresentModal}
                value={item}
              >
                {item.noteTitle}
              </NoteAcordition>
            )}
            keyExtractor={(item) => item.id}
          />
        </Pressable>
        <MyFab name={"noteAddingScreen"} />
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
  
  export default NoteScreen;
  
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
  