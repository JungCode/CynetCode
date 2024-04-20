import { StyleSheet, View } from "react-native";
import { Icon, TextInput } from "react-native-paper";
import CusButton from "../../CusButton";
import { useState } from "react";
import FlatButton from "../../FlatButton";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <TextInput
        style={styles.button}
        label="Email"
        mode="outlined"
        activeOutlineColor={Colors.green500}
        onChangeText={(text) => {
          updateInputValueHandler("email", text);
        }}
        error={emailIsInvalid}
      />
      <TextInput
        style={styles.button}
        label="Password"
        mode="outlined"
        activeOutlineColor={Colors.green500}
        secureTextEntry
        onChangeText={(text) => {
          updateInputValueHandler("password", text);
        }}
      />

      {isLogin ? (
        <FlatButton style={styles.flat}>Forgot your password?</FlatButton>
      ) : (
        <TextInput
          label="Password again"
          style={styles.button}
          mode="outlined"
          error={passwordsDontMatch}
          secureTextEntry
          activeOutlineColor={Colors.green500}
          onChangeText={(text) => {
            updateInputValueHandler("confirmPassword", text);
          }}
        />
      )}

      <CusButton onPress={submitHandler}>Sumbit</CusButton>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  flat: {
    marginBottom: 20,
  },
});
