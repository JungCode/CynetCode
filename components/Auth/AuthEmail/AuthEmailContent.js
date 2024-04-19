import { useState } from "react";
import { Alert, StyleSheet,View } from "react-native";
import AuthForm from "./AuthForm";
import { Text } from "react-native-paper";

function AuthEmailContent({ isLogin, onAuthenticate }) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function submitHandler(credentials) {
    let { email,password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    // const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
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
      <Text variant="displayLarge" style={styles.title}>
        Sign in CynetCode
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
    },
    title: {
      marginTop: 20,
      fontWeight: "bold",
    },
  });
  