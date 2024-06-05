import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import { useState } from "react";

function TwoFADisplay() {
  const [passwordSecure, setPasswordSecure] = useState(true);
  function handleSecure(password) {
    const hiddenPassword = password.replace(/./g, "•");
    return hiddenPassword;
  }
  function togglePasswordVisibility() {
    setPasswordSecure(!passwordSecure);
  }
  return (
    <View style={styles.container}>
      <View style={styles.itemcontainer}>
        <Text style={styles.subtitle}>OTPCode</Text>
        <View style={styles.passwraper}>
          <Text style={styles.subtext}>
            {passwordSecure ? handleSecure("00022222") : "00022222"}
          </Text>
          <Progress.Pie
            progress={0.4}
            size={20}
            color={Colors.green500}></Progress.Pie>
        </View>
      </View>
      <View style={styles.iconwraper}>
        <Pressable onPress={togglePasswordVisibility}>
          <Icon
            style={styles.iconstyle}
            source={passwordSecure ? "eye-outline" : "eye-off-outline"}
            size={25}></Icon>
        </Pressable>
        <Pressable style={{marginLeft:15,}}>
          <Icon style={styles.iconstyle} source="content-copy" size={25}></Icon>
        </Pressable>
      </View>
    </View>
  );
}

export default TwoFADisplay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray62,
  },
  subtext: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  itemcontainer: {
    marginBottom: 10,
  },
  passwraper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconwraper: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconstyle: {
    padding: 20,
  },
});
