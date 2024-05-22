import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import Colors from "../../constants/Colors";
import AllAccount from "../../components/Accountlist/AllAccount";
import WebsiteAccount from "../../components/Accountlist/WebsiteAccount";
import AppAccount from "../../components/Accountlist/AppAccount";
import OtherAccount from "../../components/Accountlist/OtherAccount";

function AccountScreen() {
  const [value, setValue] = useState("all");
  return (
    <SafeAreaView style={styles.container}>
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
      {value === "all" ? <AllAccount /> : null}
      {value === "website" ? <WebsiteAccount /> : null}
      {value === "app" ? <AppAccount /> : null}
      {value === "other" ? <OtherAccount /> : null}
    </SafeAreaView>
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
  },
});
