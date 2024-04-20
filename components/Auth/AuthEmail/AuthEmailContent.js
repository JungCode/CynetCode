import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthForm from "./AuthForm";

function AuthEmailContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    // const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? "Sign in to" : "Sign up to"} CynetCode
      </Text>
      <Text style={styles.des}>
        Use a CynetCode account to manage protection on all your devices.
      </Text>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}></AuthForm>
    </View>
  );
}

export default AuthEmailContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 35,
    paddingRight: 40,
    fontWeight: "bold",
    lineHeight: 50,
    paddingHorizontal: 10,
    marginBottom:10,
  },
  des: {
    fontSize:15,
    paddingHorizontal: 10,
    lineHeight: 25,
    color: Colors.gray300,
    textAlign: "justify",
    marginBottom:20,
  },
});
