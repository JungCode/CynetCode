import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { getTOTPToken } from "./util/OTP";

const App = () => {
  const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP"); // Example secret
  const [token, setToken] = useState("");
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    const updateToken = () => {
      setToken(getTOTPToken(secret));
      const currentTime = Math.floor(Date.now() / 1000);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TOTP Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Secret"
        value={secret}
        onChangeText={setSecret}
      />
      <Text style={styles.token}>{token}</Text>
      <Text style={styles.countdown}>Next token in: {remainingTime}s</Text>
      <Button
        title="Generate Token"
        onPress={() => setToken(getTOTPToken(secret))}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
  token: {
    fontSize: 32,
    marginBottom: 20,
  },
  countdown: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;