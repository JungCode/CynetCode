import React from "react";
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
  I18nManager,
} from "react-native";
import { AnimatedFAB, FAB } from "react-native-paper";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const MyFab = ({ visible, animateFrom, style, name }) => {
  const [isExtended, setIsExtended] = React.useState(true);

  const isIOS = Platform.OS === "ios";
  const navigation = useNavigation();
  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };
  return (
    <FAB
      icon={"plus"}
      extended={isExtended}
      onPress={() => {
        return navigation.navigate(name);
      }}
      visible={visible}
      animateFrom={"right"}
      iconMode={"static"}
      style={[styles.fabStyle, style, fabStyle]}
      color="white"
    />
  );
};

export default MyFab;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green600,
  },
});
