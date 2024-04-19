import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
          backgroundColor: pressedbgc ? pressedbgc : Colors.green700,
        },
      ]}
      onPress={onPress}>
      <View style={styles.innercontainer}>
        <Ionicons style={styles.icon} name={icon} size={24} color={color} />
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
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  pressed: {
    backgroundColor: Colors.green700,
  },
  icon:{
    right:90,
  },
  innercontainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
