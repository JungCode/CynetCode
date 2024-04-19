import { Pressable, Text } from "react-native";

function HeaderCloseButton() {
  return (
    <Pressable onPress={() => alert("Custom back button pressed")}>
      <Text>dumemay</Text>
    </Pressable>
  );
}
export default HeaderCloseButton;
