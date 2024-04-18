import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DrawerScreen from "./screens/DrawerScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
const Stack = createNativeStackNavigator();

function AuthScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="signup" component={SignupScreen}></Stack.Screen>
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
  return (<>
    <NavigationContainer style={{marginTop: StatusBar.currentHeight}}>
      <DrawerScreen />
    </NavigationContainer>
    <StatusBar  />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
