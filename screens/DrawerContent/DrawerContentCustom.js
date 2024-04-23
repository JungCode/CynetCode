import { DrawerContentScrollView } from "@react-navigation/drawer";
import { SafeAreaView, StyleSheet } from "react-native";
import DrawerTitle from "./DrawerTitle";
import DrawerItemCustom from "./DrawerItemCustom";
import { useState } from "react";
function DrawerContentCustom(props) {
  const [ItemIsActive, setItemIsActive] = useState("AllItem");
  function PressHandler(name) {
    setItemIsActive(name);
  }
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerTitle>CynetCode {"\n"}Password Manager</DrawerTitle>

        <DrawerItemCustom
          name="AllItem"
          labelName="All Items"
          iconName="home-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          quantity={props.itemsQuantity.AllItems}
        />
        <DrawerItemCustom
          name="Favorite"
          labelName="Favorites"
          onActive={PressHandler}
          iconName="star-outline"
          ItemIsActive={ItemIsActive}
          quantity={props.itemsQuantity.Favorites}
        />
        <DrawerItemCustom
          name="Account"
          labelName="Account"
          iconName="person-circle-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          quantity={0}
        />
        <DrawerItemCustom
          name="Card"
          labelName="Credit cards"
          iconName="card-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          quantity={0}
        />
        <DrawerItemCustom
          name="File"
          labelName="Documents"
          iconName="document-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          quantity={0}
        />
        <DrawerItemCustom
          name="Address"
          labelName="Addresses"
          iconName="home-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          quantity={0}
        />
        <DrawerItemCustom
          name="Note"
          labelName="Notes"
          iconName="reader-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          line={true}
          quantity={0}
        />
        <DrawerItemCustom
          name="PasswordChecker"
          labelName="Password Checker"
          iconName="key-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
        />
        <DrawerItemCustom
          name="PasswordCreator"
          labelName="Password Creator"
          iconName="color-wand-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          line={true}
        />
        <DrawerItemCustom
          name="Setting"
          labelName="Settings"
          iconName="settings-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          line={true}
        />
        <DrawerItemCustom
          name="Lock"
          labelName="Lock"
          iconName="lock-closed-outline"
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          line={true}
        />
        <DrawerItemCustom
          name="For others devices"
          labelName="For others devices"
          iconName=""
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
        />
        <DrawerItemCustom
          name="Help"
          labelName="Help"
          iconName=""
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
        />

        <DrawerItemCustom
          name="Introduction"
          labelName="Introduction"
          iconName=""
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
          line={true}
        />
        <DrawerItemCustom
          name="Logout"
          labelName="Log out"
          iconName=""
          onActive={PressHandler}
          ItemIsActive={ItemIsActive}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}
export default DrawerContentCustom;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});
