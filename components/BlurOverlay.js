import { Pressable, StyleSheet, View } from "react-native";

function BlurOverlay({onPress}) {

  return <Pressable onPress={onPress} style={styles.overlay} />;
}

export default BlurOverlay;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});
