import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DrawerScreen from "./screens/DrawerScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AllItemsModal from "./screens/Modals/AllItemsModal";
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
function ModalScreen() {
  return (
    <>
      <NavigationContainer style={{ marginTop: StatusBar.currentHeight }}>
        <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
          <Stack.Screen
            name="drawerScreen"
            component={DrawerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="addingScreen"
            component={AllItemsModal}
            options={{ headerTitle: "New Item" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
export default function App() {
  return <ModalScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
