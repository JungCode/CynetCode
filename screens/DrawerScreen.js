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
import { off, onValue, ref } from "firebase/database";
import { db } from "../util/https-fetch";

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  const itemsCtx = useContext(ItemsContext);
  const authCtx = useContext(AuthContext);

  const [fetchedAccountsQuantity, setAccountsQuantity] = useState();
  const [fetchedAppsQuantity, setAppsQuantity] = useState();
  const [fetchedNotesQuantity, setNotesQuantity] = useState();
  const [fetchedAddressesQuantity, setAddressesQuantity] = useState();
  const [fetchedFilesQuantity, setFilesQuantity] = useState();
  const [fetchedFvtAccountsQuantity, setFvtAccountsQuantity] = useState();
  const [fetchedFvtAppsQuantity, setFvtAppsQuantity] = useState();
  const [fetchedFvtNotesQuantity, setFvtNotesQuantity] = useState();
  const [fetchedFvtAddressesQuantity, setFvtAddressesQuantity] = useState();
  const [fetchedFvtFilesQuantity, setFvtFilesQuantity] = useState();
  const [fetchedFavoritesQuantity, setFavoritesQuantity] = useState(0);
  useEffect(() => {
    const accountsRef = ref(db, "webItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      let count = 0;
      let fvtCount = 0;
      dataArray.forEach((item) => {
        if (item.userId == authCtx.userId) {
          count++;
          if (item.favorite) fvtCount++;
        }
      });
      setFvtAccountsQuantity(fvtCount);
      setAccountsQuantity(count);
    };
    onValue(accountsRef, onValueChangeAccounts);
    return () => {
      off(accountsRef, onValueChangeAccounts);
    };
  }, []);
  useEffect(() => {
    const accountsRef = ref(db, "appItems");
    // Lắng nghe sự thay đổi trong Realtime Database
    const onValueChangeAccounts = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      let count = 0;
      let fvtCount = 0;
      dataArray.forEach((item) => {
        if (item.userId == authCtx.userId) {
          count++;
          if (item.favorite) fvtCount++;
        }
      });
      setFvtAppsQuantity(fvtCount);
      setAppsQuantity(count);
    };
    onValue(accountsRef, onValueChangeAccounts);
    return () => {
      off(accountsRef, onValueChangeAccounts);
    };
  }, []);
  useEffect(() => {
    const notesRef = ref(db, "NoteItems");

    const onValueChangeNotes = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      let count = 0;
      let fvtCount = 0;
      dataArray.forEach((item) => {
        if (item.userId == authCtx.userId) {
          count++;
          if (item.favorite) fvtCount++;
        }
      });
      setFvtNotesQuantity(fvtCount);
      setNotesQuantity(count);
    };

    onValue(notesRef, onValueChangeNotes);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(notesRef, onValueChangeNotes);
    };
  }, []);
  useEffect(() => {
    const addressesRef = ref(db, "addressItems");

    const onValueChangeNotes = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      let count = 0;
      let fvtCount = 0;
      dataArray.forEach((item) => {
        if (item.userId == authCtx.userId) {
          count++;
          if (item.favorite) fvtCount++;
        }
      });
      setFvtAddressesQuantity(fvtCount);
      setAddressesQuantity(count);
    };

    onValue(addressesRef, onValueChangeNotes);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(addressesRef, onValueChangeNotes);
    };
  }, []);
  useEffect(() => {
    const filesRef = ref(db, "FileItems");

    const onValueChangeNotes = (snapshot) => {
      const dataArray = [];
      snapshot.forEach((childSnapshot) => {
        dataArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      let count = 0;
      let fvtCount = 0;
      dataArray.forEach((item) => {
        if (item.userId == authCtx.userId) {
          count++;
          if (item.favorite) fvtCount++;
        }
      });
      setFvtFilesQuantity(fvtCount);
      setFilesQuantity(count);
    };

    onValue(filesRef, onValueChangeNotes);
    // Ngắt kết nối listener khi component unmount
    return () => {
      off(filesRef, onValueChangeNotes);
    };
  }, []);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 7,
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
      drawerContent={(props) => (
        <DrawerContentCustom
          {...props}
          itemsQuantity={{
            AllItems:
              fetchedAccountsQuantity +
              fetchedAppsQuantity +
              fetchedFilesQuantity +
              fetchedNotesQuantity +
              fetchedAddressesQuantity,
            Favorites:
              fetchedFvtAccountsQuantity +
              fetchedFvtAppsQuantity +
              fetchedFvtNotesQuantity +
              fetchedFvtAddressesQuantity +
              fetchedFvtFilesQuantity,
            Account: fetchedAccountsQuantity + fetchedAppsQuantity,
            Files: fetchedFilesQuantity,
            Addresses: fetchedAddressesQuantity,
            Notes: fetchedNotesQuantity,
          }}
        />
      )}
    >
      <Drawer.Screen
        name="AllItem"
        component={AllItemScreen}
        options={{ headerTitle: "All Items" }}
      />
      <Drawer.Screen name="Favorite" component={FavoriteScreen} />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Card" component={CardScreen} />
      <Drawer.Screen name="Files" component={FilesScreen} />
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
