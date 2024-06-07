import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal, PaperProvider } from "react-native-paper";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";

const MyFabGroup = ({ onPress, onTakingPicture }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  async function ImagePickerHandler() {}
  return (
    <Portal>
      <FAB.Group
        color="white"
        fabStyle={{ backgroundColor: Colors.green600 }}
        open={open}
        visible
        icon={open ? "image-filter-center-focus" : "plus"}
        actions={[
          {
            icon: "camera",
            label: "Camera",
            style: { backgroundColor: Colors.green600 },
            color: "white",
            onPress: onTakingPicture,
          },
          {
            icon: "file-image-plus-outline",
            style: { backgroundColor: Colors.green600 },
            color: "white",
            label: "Gallery",
            onPress: onPress,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default MyFabGroup;
const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green600,
  },
});
