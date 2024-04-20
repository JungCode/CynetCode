import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

function IconButton({
  children,
  onPress,
  bgc,
  color,
  pressedbgc,
  borcolor,
  icon,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgc ? bgc : Colors.green500,

          borderColor: borcolor ? borcolor : Colors.green500,
        },
        pressed && {
          backgroundColor: pressedbgc ? pressedbgc : Colors.green600,
        },
      ]}
      onPress={onPress}>
      <View style={styles.innercontainer}>
        <Image style={styles.icon} source={icon} />
        <Text
          style={[styles.buttonText, { color: color ? color : Colors.white }]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 2,
  },
  icon: {
    height: 30,
    width: 30,
    position:"absolute",
    left:10,
  },
  innercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
