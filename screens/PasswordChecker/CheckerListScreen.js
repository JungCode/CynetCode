import { StyleSheet, Text, View } from "react-native";
import CheckerListNotify from "../../components/PasswordChecker/CheckerListNotify";
import CheckerCategrory from "../../components/PasswordChecker/CheckerCategory";
import CheckerListItem from "../../components/PasswordChecker/CheckerListItem";
import { useNavigation } from "@react-navigation/native";

function CheckerListScreen() {
    const navigation = useNavigation();
    
    function navigateChecker() {
        navigation.navigate("CheckerItemDetail");
    }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>3 passwords have been compromised</Text>
      </View>
      <CheckerListNotify style={styles.notify}
        icon="lock-open-variant"
        color={Colors.red100}
        text="Hackers know this password, so the account yours can be easily jailbroken."></CheckerListNotify>
      <CheckerListItem
        onPress={navigateChecker}
        icon="lock-open-variant"
        color={Colors.red100}
        webname="Testweb"
        account="account"></CheckerListItem>
    </View>
  );
}

export default CheckerListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.black100,
    marginBottom: 20,
  },
  sub: {
    fontSize: 20,
    color: Colors.gray300,
  },
});
