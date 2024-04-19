import { useContext, useState } from "react";
import AuthEmailContent from "./AuthEmailContent";
import LoadingOverlay from "../../LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../../../store/auth-context";
import { login } from "../../../util/auth";

function LoginEmailScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log({email,password});
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <AuthEmailContent isLogin onAuthenticate={loginHandler}></AuthEmailContent>
  );
}

export default LoginEmailScreen;
