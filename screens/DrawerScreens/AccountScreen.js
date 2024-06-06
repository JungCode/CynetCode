import { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Colors from "../../constants/Colors";
import AllAccount from "../../components/Accountlist/AllAccount";
import WebsiteAccount from "../../components/Accountlist/WebsiteAccount";
import AppAccount from "../../components/Accountlist/AppAccount";
import OtherAccount from "../../components/Accountlist/OtherAccount";
import BlurOverlay from "../../components/BlurOverlay";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ItemBottomSheetContent from "../../components/BottomSheet/ItemBottomSheetContent";

function AccountScreen() {
  const [value, setValue] = useState("all");
  const [itemBottomSheet, setitemBottomSheet] = useState();
  const [isBottomDisplay, setBottomDisplay] = useState(false);
  const handleItemBottomSheet = (value) => {
    setitemBottomSheet(value);
    handlePresentModal();
  };
  const bottomSheetModalRef = useRef(null);
  const spanPoints = ["50%"];
  function handlePresentModal() {
    setBottomDisplay(true);
    bottomSheetModalRef.current?.present();
  }
  function handleDismissModal() {
    setBottomDisplay(false);
    bottomSheetModalRef.current?.dismiss();
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        {isBottomDisplay && <BlurOverlay onPress={handleDismissModal}></BlurOverlay>}
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          density="small"
          theme={{ colors: { secondaryContainer: "#c2eae3" } }}
          style={styles.segcontainer}
          buttons={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "website",
              label: "Website",
            },
            { value: "app", label: "App" },
            { value: "other", label: "Other" },
          ]}
        />
        <View style={value === "all" ? styles.cover : styles.hidden}>
          <AllAccount onEvent={handleItemBottomSheet} />
        </View>
        <View style={value === "website" ? styles.cover : styles.hidden}>
          <WebsiteAccount onEvent={handleItemBottomSheet} />
        </View>
        <View style={value === "app" ? styles.cover : styles.hidden}>
          <AppAccount onEvent={handleItemBottomSheet}/>
        </View>
        <View style={value === "other" ? styles.cover : styles.hidden}>
          <OtherAccount />
        </View>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={spanPoints}
        onDismiss={handleDismissModal}>
        <ItemBottomSheetContent
          handleDismissModal={handleDismissModal}
          item={itemBottomSheet}></ItemBottomSheetContent>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  segcontainer: {
    fontWeight: "400",
    width: "100%",
  },
  cover: {
    overflow: "visible",
    flex: 1,
    width: "100%",
  },
  hidden: {
    display: "none",
  },
});
