import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import WelcomeScreen from "./screens/WelcomeScreen";
import AuthEmailScreen from "./components/Auth/AuthEmail/AuthEmailScreen";

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
        component={LoginScreen}
        options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen
        name="signup"
        component={SignupStack}
        options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthScreen></AuthScreen>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Navigation></Navigation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
