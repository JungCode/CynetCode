import { createDrawerNavigator } from "@react-navigation/drawer";
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
