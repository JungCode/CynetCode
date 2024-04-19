import { View } from "react-native";
import { TextInput } from "react-native-paper";
import CusButton from "../../CusButton";
import { useState } from "react";

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
        label="Email"
        mode="outlined"
        activeOutlineColor={Colors.green500}
        onChangeText={(text) => {
          updateInputValueHandler("email", text);
        }}
        error={emailIsInvalid}
      />
      <TextInput
        label="Password"
        mode="outlined"
        activeOutlineColor={Colors.green500}
        // error={emailIsInvalid}
        onChangeText={(text) => {
          updateInputValueHandler("password", text);
        }}
      />
      {isLogin ? (
        null
      ) : (
        <TextInput
          label="Password again"
          mode="outlined"
          error={passwordsDontMatch}
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
