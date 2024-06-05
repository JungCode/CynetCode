import { StyleSheet, Text, View } from "react-native";
import CheckerCategrory from "../../components/PasswordChecker/CheckerCategory";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../util/https-fetch";
import { AuthContext } from "../../store/auth-context";
import { Buffer } from 'buffer';

function PasswordCheckerScreen() {
  const [fetchedWeakAccounts, setFetchedWeakAccounts] = useState([]);
  const [fetchedDuplicateAccounts, setFetchedDuplicateAccounts] = useState([]);
  const [fetchedStrongAccounts, setFetchedStrongAccounts] = useState([]);
  const [fetchedCompromisedAccounts, setFetchedCompromisedAccounts] = useState(
    []
  );
  const [fetchedAccountsQuantity, setFetchedAccountsQuantity] = useState(0);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  function isWeakPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return true; // Mật khẩu yếu vì quá ngắn
    }
    if (!hasUpperCase) {
      return true; // Mật khẩu yếu vì thiếu chữ hoa
    }
    if (!hasLowerCase) {
      return true; // Mật khẩu yếu vì thiếu chữ thường
    }
    if (!hasNumber) {
      return true; // Mật khẩu yếu vì thiếu số
    }
    if (!hasSpecialChar) {
      return true; // Mật khẩu yếu vì thiếu ký tự đặc biệt
    }
    return false; // Mật khẩu không yếu
  }
  function isDuplicatePassword(password, knownPasswords) {
    let count = 0;
    knownPasswords.forEach((element) => {
      if (element === password) count++;
    });
    if (count == 2) return true;
    return false;
  }
  function navigateChecker(category) {
    if (category == "Compromised") {
      navigation.navigate("CheckerileListScreen", {
        compromised: fetchedCompromisedAccounts,
        weak: fetchedWeakAccounts,
        duplicate: fetchedDuplicateAccounts,
        strong: fetchedStrongAccounts,
        state: "Compromised",
      });
    }
    if (category == "Weak") {
      navigation.navigate("CheckerileListScreen", {
        compromised: fetchedCompromisedAccounts,
        weak: fetchedWeakAccounts,
        duplicate: fetchedDuplicateAccounts,
        strong: fetchedStrongAccounts,
        state: "Weak",
      });
    }
    if (category == "Strong") {
      navigation.navigate("CheckerileListScreen", {
        compromised: fetchedCompromisedAccounts,
        weak: fetchedWeakAccounts,
        duplicate: fetchedDuplicateAccounts,
        strong: fetchedStrongAccounts,
        state: "Strong",
      });
    }
    if (category == "Duplicate") {
      navigation.navigate("CheckerileListScreen", {
        compromised: fetchedCompromisedAccounts,
        weak: fetchedWeakAccounts,
        duplicate: fetchedDuplicateAccounts,
        strong: fetchedStrongAccounts,
        state: "Duplicate",
      });
    }
  }
  function checkingForStrongAccount(userName, userNames) {
    return !userNames.includes(userName);
  }
  function checkingForCompromisedAccount(password) {
    return password.includes("123");
  }
  useEffect(() => {
    const accountsRef = ref(db, "webItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        const decodedPasswordBuffer = Buffer.from(childSnapshot.val().password, 'base64');
        // Convert Buffer back to string
        const decodedPassword = decodedPasswordBuffer.toString('utf-8');

        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val(),password: decodedPassword });
      });
      console.log(dataArray);
      const filteredAccounts = dataArray.filter((item) => {
        return item.userId === authCtx.userId;
      });
      const filteredWeakAccounts = filteredAccounts.filter((item) => {
        return isWeakPassword(item.password);
      });
      const filteredDuplicateAccounts = filteredAccounts.filter((item) => {
        return isDuplicatePassword(
          item.password,
          filteredAccounts.map((account) => account.password)
        );
      });
      const filterStrongAccounts = filteredAccounts.filter(
        (item) =>
          checkingForStrongAccount(
            item.userName,
            filteredWeakAccounts.map((account) => account.userName)
          ) &&
          checkingForStrongAccount(
            item.userName,
            filteredDuplicateAccounts.map((account) => account.userName)
          )
      );
      const filteredCompromisedAccounts = filteredAccounts.filter((item) =>
        checkingForCompromisedAccount(item.password)
      );
      setFetchedCompromisedAccounts(filteredCompromisedAccounts);
      setFetchedStrongAccounts(filterStrongAccounts);
      setFetchedWeakAccounts(filteredWeakAccounts);
      setFetchedDuplicateAccounts(filteredDuplicateAccounts);
      setFetchedAccountsQuantity(filteredAccounts.length);
    };
    onValue(accountsRef, onValueChangeAccounts);

    // Ngắt kết nối listener khi component unmount
    return () => {
      // off(accountsRef, onValueChangeAccounts);
    };
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You have {fetchedAccountsQuantity} passwords
          </Text>
          <Text style={styles.sub}>
            Some of your passwords need your attention.
          </Text>
        </View>
        <CheckerCategrory
          onPress={navigateChecker.bind(this, "Compromised")}
          icon="lock-open-variant"
          color={Colors.red100}
          num={fetchedCompromisedAccounts.length}
          strengh="Compromised"
        ></CheckerCategrory>
        <CheckerCategrory
          onPress={navigateChecker.bind(this, "Weak")}
          icon="alert-outline"
          color={Colors.red100}
          num={fetchedWeakAccounts.length}
          strengh="Weak"
        ></CheckerCategrory>
        <CheckerCategrory
          onPress={navigateChecker.bind(this, "Strong")}
          icon="check-circle-outline"
          color={Colors.green500}
          num={fetchedStrongAccounts.length}
          strengh="Strong"
        ></CheckerCategrory>
        <CheckerCategrory
          onPress={navigateChecker.bind(this, "Duplicate")}
          icon="checkbox-multiple-blank-outline"
          color={Colors.yellow100}
          num={fetchedDuplicateAccounts.length}
          strengh="Duplicate"
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
