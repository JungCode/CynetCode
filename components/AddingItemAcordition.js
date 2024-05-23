import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Chevron from "./Accordions/Chevron";
import Colors from "../constants/Colors";
import AddingItem from "./AddingItem";

function AddingItemAcordition({ icon, name,children }) {
  //dropdown js
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      Extrapolate.CLAMP
    ),
  }));
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: Colors.gray200 }}
        style={styles.titleContainer}
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet";
              heightValue.value = withTiming(measure(listRef).height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}>
        <View style={styles.maintitle}>
        
          <View style={styles.chevron}>
            <Chevron progress={progress}></Chevron>
          </View>
          <Icon source={icon} size={30}></Icon>
          <Text style={styles.text}>{name}</Text>
        </View>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default AddingItemAcordition;
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  textTitle: {
    fontSize: 20,
    color: "black",
  },
  titleContainer: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  maintitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 15,
  },
  chevron: {
    width: 45,
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    overflow: "hidden",
    height: "auto",
  },
  content: {
    backgroundColor: Colors.graycontent,
    flexDirection: "column",
  },
  itemcontainer: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
