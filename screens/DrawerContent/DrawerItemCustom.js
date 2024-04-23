import { DrawerItem } from "@react-navigation/drawer";
import DrawerLabel from "./DrawerLabel";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { AuthContext } from "../../store/auth-context";

function DrawerItemCustom({
  name,
  labelName,
  iconName,
  onActive,
  ItemIsActive,
  line,
  quantity,
}) {
  const navigation = useNavigation();
  const style = ItemIsActive == name ? styles.OnActive : null;
  const lineStyle = line ? styles.line : null;
  let onPressHandler = () => {
    onActive(name);
    return navigation.navigate(name);
  };
  const autCtx = useContext(AuthContext);
  if (name == "Logout") {
    onPressHandler = () => {
      autCtx.logout();
    };
  }
  return (
    <TouchableRipple
      style={[style, styles.drawerItem, lineStyle]}
      rippleColor="#c6f4e1"
      onPress={onPressHandler}
    >
      <DrawerLabel title={labelName} iconName={iconName} quantity={quantity} />
    </TouchableRipple>
  );
}
export default DrawerItemCustom;
const styles = StyleSheet.create({
  drawerItem: {
    height: 63,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    paddingRight: 20,
    flex: 1,
    alignItems: "center",
  },
  line: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  OnActive: {
    borderLeftWidth: 4,
    borderLeftColor: "#009590",
    backgroundColor: "#dafff0",
  },
});
