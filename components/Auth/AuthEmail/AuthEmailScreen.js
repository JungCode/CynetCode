import { useContext, useState } from "react";

import AuthEmailContent from "./AuthEmailContent";
import { createUser } from "../../../util/auth";
import LoadingOverlay from "../../LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../../../store/auth-context";

function AuthEmailScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthEmailContent onAuthenticate={signupHandler}></AuthEmailContent>;
}

export default AuthEmailScreen;
