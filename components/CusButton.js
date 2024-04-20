import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

function CusButton({ children, onPress, bgc, color, pressedbgc, borcolor }) {
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
      <View >
        <Text
          style={[styles.buttonText, { color: color ? color : Colors.white }]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default CusButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
  },
  pressed: {
    backgroundColor: Colors.green600,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
