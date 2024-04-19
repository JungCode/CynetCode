import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import WelcomeScreen from "./screens/WelcomeScreen";
import AuthEmailScreen from "./components/Auth/AuthEmail/AuthEmailScreen";
import LoginEmailScreen from "./components/Auth/AuthEmail/LoginEmailScreen";
import DrawerScreen from "./screens/DrawerScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";

const Stack = createNativeStackNavigator();

function SignupStack() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="AuthContent"
        component={SignupScreen}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="AuthEmailScreen"
        component={AuthEmailScreen}
        options={{}}></Stack.Screen>
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="AuthContent"
        component={LoginScreen}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="LoginEmailScreen"
        component={LoginEmailScreen}
        options={{}}></Stack.Screen>
    </Stack.Navigator>
  );
}

function AuthScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="login"
        component={LoginStack}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="signup"
        component={SignupStack}
        options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated &&  <AuthScreen></AuthScreen>}
      {authCtx.isAuthenticated && <DrawerScreen></DrawerScreen>}

    </NavigationContainer>
  );
}
export default function App() {
  return (
    <AuthContextProvider style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Navigation></Navigation>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
