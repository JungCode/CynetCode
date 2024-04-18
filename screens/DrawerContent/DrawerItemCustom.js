import { DrawerItem } from "@react-navigation/drawer";
import DrawerLabel from "./DrawerLabel";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

function DrawerItemCustom({
  name,
  labelName,
  iconName,
  onActive,
  ItemIsActive,
  line,
  quantity
}) {
  const navigation = useNavigation();
  const style = ItemIsActive == name ? styles.OnActive : null;
  const lineStyle = line ? styles.line : null;
  return (
    <TouchableRipple
      style={[style, styles.drawerItem, lineStyle]}
      rippleColor="#c6f4e1"
      onPress={() => {
        onActive(name);
        return navigation.navigate(name);
      }}
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
    alignItems: 'center',
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
