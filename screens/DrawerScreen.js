import { createDrawerNavigator } from "@react-navigation/drawer";
import AllItemScreen from "./screens/DrawerScreens/AllItemScreen";
import FavoriteScreen from "./screens/DrawerScreens/FavoriteScreen";
import AccountScreen from "./screens/DrawerScreens/AccountScreen";
import CardScreen from "./screens/DrawerScreens/CardScreen";
import FilesScreen from "./screens/DrawerScreens/FilesScreen";
import AddressScreen from "./screens/DrawerScreens/AddressScreen";
import NoteScreen from "./screens/DrawerScreens/NoteScreen";
import PasswordCreatorScreen from "./screens/DrawerScreens/PassworCreatorScreen";
import PasswordCheckerScreen from "./screens/DrawerScreens/PasswordCheckerScreen";
import SettingScreen from "./screens/DrawerScreens/SettingScreen";
import Lock from "./screens/DrawerScreens/Lock";

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="AllItem" component={AllItemScreen} />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Card" component={CardScreen} />
      <Drawer.Screen name="File" component={FilesScreen} />
      <Drawer.Screen name="Address" component={AddressScreen} />
      <Drawer.Screen name="Note" component={NoteScreen} />
      <Drawer.Screen name="PasswordChecker" component={PasswordCheckerScreen} />
      <Drawer.Screen name="PasswordCreator" component={PasswordCreatorScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
      <Drawer.Screen name="Lock" component={Lock} />
    </Drawer.Navigator>
  );
}
export default  DrawerScreen;
