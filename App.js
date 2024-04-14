import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

function AuthScreen() {
  return (
    <Stack.Navigator>
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
  return (
    <>
      <StatusBar style="dark"></StatusBar>
      <Navigation></Navigation>
    </>
  );
}

const styles = StyleSheet.create({});
