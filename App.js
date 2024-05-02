import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar, StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import WelcomeScreen from "./screens/WelcomeScreen";
import AddingOptionsModal from "./screens/Modals/AddingOptionsModal";
import WebsiteAddingScreen from "./screens/AddingScreens/WebsiteAddingScreen";
import AuthEmailScreen from "./components/Auth/AuthEmail/AuthEmailScreen";
import LoginEmailScreen from "./components/Auth/AuthEmail/LoginEmailScreen";
import DrawerScreen from "./screens/DrawerScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext } from "react";
import HeaderCloseButton from "./components/Navigation/HeaderCloseButton";
import ItemsContextProvider from "./store/items-context";
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AppLoading from "expo-app-loading";
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
// auth navigation between Main screen vs Login screen
function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthScreen></AuthScreen>}
      {authCtx.isAuthenticated && <ModalScreen />}
    </NavigationContainer>
  );
}
// main App
export default function App() {


  return (
    // <GestureHandlerRootView>
      <AuthContextProvider style={styles.container}>
        <StatusBar style="dark"></StatusBar>
        <Navigation></Navigation>
      </AuthContextProvider>
    // </GestureHandlerRootView>
  );
}
// modal navigation
function ModalScreen() {
  return (
    <ItemsContextProvider>
      <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
        <Stack.Screen
          name="drawerScreen"
          component={DrawerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addingOptionsModal"
          component={AddingOptionsModal}
          options={{ headerTitle: "New Item" }}
        />
        <Stack.Screen
          name="websiteAddingScreen"
          component={WebsiteAddingScreen}
          options={{
            headerTitle: "Website",
            animation: "slide_from_right",
            headerStyle: {
              alignItems: "center",
            },
            headerLeft: (props) => <HeaderCloseButton />,
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </ItemsContextProvider>
  );
}
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
