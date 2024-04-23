import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome6 } from "@expo/vector-icons";
import DrawerContentCustom from "./DrawerContent/DrawerContentCustom";
import { StyleSheet, Text, View } from "react-native";
import { createContext, useContext, useEffect, useState } from "react";
import AllItemScreen from "./DrawerScreens/AllItemScreen";
import FavoriteScreen from "./DrawerScreens/FavoriteScreen";
import AccountScreen from "./DrawerScreens/AccountScreen";
import CardScreen from "./DrawerScreens/CardScreen";
import FilesScreen from "./DrawerScreens/FilesScreen";
import AddressScreen from "./DrawerScreens/AddressScreen";
import NoteScreen from "./DrawerScreens/NoteScreen";
import PasswordCreatorScreen from "./DrawerScreens/PassworCreatorScreen";
import PasswordCheckerScreen from "./DrawerScreens/PasswordCheckerScreen";
import Lock from "./DrawerScreens/Lock";
import SettingScreen from "./DrawerScreens/SettingScreen";
import Logout from "./DrawerScreens/LogOut";
import ItemsContextProvider, { ItemsContext } from "../store/items-context";
import { AuthContext } from "../store/auth-context";

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  const itemsCtx = useContext(ItemsContext);
  const authCtx = useContext(AuthContext);
  
  const [fetchedQuantity, setFetchedQuantity] = useState([]);

  useEffect(() => {
    async function getItems() {
      const data = await itemsCtx.countingQuantity(authCtx.userId);
      setFetchedQuantity(data);
    }
    getItems();
  }, [itemsCtx.refresh]);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          shadowColor: "black",
        },
        headerRight: () => (
          <FontAwesome6
            style={styles.glassIcon}
            name="magnifying-glass"
            size={24}
            color="black"
          />
        ),
        drawerActiveBackgroundColor: "green",
        drawerActiveTintColor: "black",
      }}
      drawerContent={(props) => <DrawerContentCustom {...props} itemsQuantity={fetchedQuantity} />}
    >
      <Drawer.Screen
        name="AllItem"
        component={AllItemScreen}
        options={{ headerTitle: "All Items" }}
      />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Card" component={CardScreen} />
      <Drawer.Screen name="File" component={FilesScreen} />
      <Drawer.Screen name="Address" component={AddressScreen} />
      <Drawer.Screen name="Note" component={NoteScreen} />
      <Drawer.Screen
        name="PasswordChecker"
        component={PasswordCheckerScreen}
        options={{ headerTitle: "Password Checker" }}
      />
      <Drawer.Screen
        name="PasswordCreator"
        component={PasswordCreatorScreen}
        options={{ headerTitle: "Password Creator" }}
      />
      <Drawer.Screen name="Setting" component={SettingScreen} />
      <Drawer.Screen name="Lock" component={Lock} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
export default DrawerScreen;

const styles = StyleSheet.create({
  glassIcon: {
    marginRight: 20,
  },
  activeStyle: {
    borderLeftWidth: 4,
    borderLeftColor: "green",
  },
});
