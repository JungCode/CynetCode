import { FlatList, StyleSheet, Text, View } from "react-native";
import CheckerListNotify from "../../components/PasswordChecker/CheckerListNotify";
import CheckerCategrory from "../../components/PasswordChecker/CheckerCategory";
import CheckerListItem from "../../components/PasswordChecker/CheckerListItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import Colors from "../../constants/Colors";

function CheckerListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  let accounts;
  let icon;
  let color;
  if (route.params.state === "Compromised") {
    accounts = route.params.compromised;
    icon = "lock-open-variant";
    color = Colors.red100;
  } else if (route.params.state === "Weak") {
    accounts = route.params.weak;
    icon = "alert-outline";
    color = Colors.red100;
  } else if (route.params.state === "Strong") {
    accounts = route.params.strong;
    icon = "check-circle-outline";
    color = Colors.green500;
  } else if (route.params.state === "Duplicate") {
    accounts = route.params.duplicate;
    icon = "checkbox-multiple-blank-outline";
    color = Colors.yellow100;
  }
  function navigateChecker(item) {
    navigation.navigate("CheckerItemDetail", {
      item: item,
      compromised: checkingState(
        item.userName,
        route.params.compromised.map((account) => account.userName)
      ),
      weak: checkingState(
        item.userName,
        route.params.weak.map((account) => account.userName)
      ),
      duplicate: checkingState(
        item.userName,
        route.params.duplicate.map((account) => account.userName)
      ),
      strong: checkingState(
        item.userName,
        route.params.strong.map((account) => account.userName)
      ),
    });
  }
  function checkingState(userName, userNames) {
    return userNames.includes(userName);
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {route.params.length} passwords have been {route.params.state}
        </Text>
      </View>
      <CheckerListNotify
        style={styles.notify}
        icon={icon}
        color={color}
        text="Hackers know this password, so the account yours can be easily jailbroken."
      ></CheckerListNotify>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <CheckerListItem
            onPress={navigateChecker.bind(this, item)}
            icon={icon}
            color={color}
            webname={item.webName}
            account={item.userName}
          ></CheckerListItem>
        )}
        keyExtractor={(item) => item.id}
      />
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
