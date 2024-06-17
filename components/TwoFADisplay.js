import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import { getTOTPToken } from "../util/OTP";

function TwoFADisplay({ secretKey }) {
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [secret, setSecret] = useState(secretKey); // Example secret
  const [token, setToken] = useState("");
  const [remainingTime, setRemainingTime] = useState(30);
  function handleSecure(password) {
    const hiddenPassword = password.replace(/./g, "•");
    return hiddenPassword;
  }
  function togglePasswordVisibility() {
    setPasswordSecure(!passwordSecure);
  }

  useEffect(() => {
    const updateToken = () => {
      setToken(getTOTPToken(secret));
      const currentTime = Math.floor(Date.now() / 1000)+5;
      console.log(30 - (currentTime % 30));
      setRemainingTime(30 - (currentTime % 30));
    };

    updateToken(); // Initial token generation

    const countdownId = setInterval(() => {
      setRemainingTime((time) => {
        if (time == 0) {
          updateToken();
        }
        return time > 0 ? time - 1 : 30;
      });
    }, 1000); // Update countdown every second

    return () => {
      clearInterval(countdownId);
    };
  }, [secret]);
  return (
    <>
      {secretKey != "" ? (
        <View style={styles.container}>
          <View style={styles.itemcontainer}>
            <Text style={styles.subtitle}>OTPCode</Text>
            <View style={styles.passwraper}>
              <Text style={styles.subtext}>
                {passwordSecure ? handleSecure(token) : token}
              </Text>
              <Progress.Pie
                progress={(30 - remainingTime) / 30}
                size={20}
                color={Colors.green500}
              ></Progress.Pie>
            </View>
          </View>
          <View style={styles.iconwraper}>
            <Pressable onPress={togglePasswordVisibility}>
              <Icon
                style={styles.iconstyle}
                source={passwordSecure ? "eye-outline" : "eye-off-outline"}
                size={30}
              ></Icon>
            </Pressable>
            <Pressable style={{ marginLeft: 15 }}>
              <Icon
                style={styles.iconstyle}
                source="content-copy"
                size={30}
              ></Icon>
            </Pressable>
          </View>
        </View>
      ) : null}
    </>
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
