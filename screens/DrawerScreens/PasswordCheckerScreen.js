import { StyleSheet, Text, View } from "react-native";
import CheckerCategrory from "../../components/PasswordChecker/CheckerCategory";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../util/https-fetch";

function PasswordCheckerScreen() {
  const [fetchedAccounts,setFetchedAccounts] = useState();
  useEffect(() => {
    const accountsRef = ref(db, "webItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
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
  const navigation = useNavigation();

  function navigateChecker() {
    console.log(fetchedAccounts);
    navigation.navigate("CheckerileListScreen");
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>You have 2 passwords</Text>
          <Text style={styles.sub}>
            Some of your passwords need your attention.
          </Text>
        </View>
        <CheckerCategrory
          onPress={navigateChecker}
          icon="lock-open-variant"
          color={Colors.red100}
          num={10}
          strengh="Compromised"
        ></CheckerCategrory>
        <CheckerCategrory
          icon="alert-outline"
          color={Colors.red100}
          num={10}
          strengh="Compromised"
        ></CheckerCategrory>
        <CheckerCategrory
          icon="check-circle-outline"
          color={Colors.green500}
          num={10}
          strengh="Compromised"
        ></CheckerCategrory>
        <CheckerCategrory
          icon="checkbox-multiple-blank-outline"
          color={Colors.yellow100}
          num={10}
          strengh="Compromised"
        ></CheckerCategrory>
      </View>
    </>
  );
}

export default PasswordCheckerScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.black100,
    marginBottom: 20,
  },
  sub: {
    fontSize: 20,
    color: Colors.gray300,
  },
});
