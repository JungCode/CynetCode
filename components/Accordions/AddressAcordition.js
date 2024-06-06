import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Chevron from "./Chevron";
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
import Colors from "../../constants/Colors";
import FlatButton from "../../components/FlatButton";
import CusButton from "../CusButton";
import { useState } from "react";
function AddressAcordition({ value, handlePresentModal, setIsFetchedItems }) {
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

  const fecthedImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizhv-N62aQ8dhiNvEJuixDaLY5CkkusaIhw&s";
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ backgroundColor: Colors.graye0 }}
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
        }}
      >
        <View style={styles.maintitle}>
          <Chevron progress={progress}></Chevron>
          <View style={styles.imgStyle}>
            <Icon
              source="home-outline"
              size={35}
              style={styles.imgStyle}
            ></Icon>
          </View>
          {/* <Image source={{ uri: fecthedImg }} style={styles.imgStyle} /> */}
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>{value.addressName}</Text>
            <Text style={styles.suburl}>Address</Text>
          </View>
        </View>
        <Pressable
          onPress={handlePresentModal.bind(
            this,
            {
              ...value,
              icon: "home-outline",
            },
            setIsFetchedItems
          )}
        >
          <Icon source="dots-vertical" size={25}></Icon>
        </Pressable>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.itemcontainer}>
              <View>
                <Text style={styles.subtitle}>Name</Text>
              </View>
              <View style={styles.copywrap}>
                <Text style={styles.subtext}>{value.addressName}</Text>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}
                  ></Icon>
                </Pressable>
              </View>
            </View>
            <View style={styles.itemcontainer}>
              <View>
                <Text style={styles.subtitle}>Address</Text>
              </View>
              <View style={styles.copywrap}>
                <Text style={styles.subtext}>{value.addressDetail}</Text>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}
                  ></Icon>
                </Pressable>
              </View>
            </View>
            <View style={styles.itemcontainer}>
              <View>
                <Text style={styles.subtitle}>Map link</Text>
              </View>
              <View style={styles.copywrap}>
                <Text style={styles.subtext}>{value.mapLink}</Text>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}
                  ></Icon>
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default AddressAcordition;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#E3EDFB",
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: "hidden",
  },
  textTitleContainer: {
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "center",
    height: 45,
  },
  textTitle: {
    fontSize: 20,
    color: "black",
  },
  suburl: {
    fontSize: 18,
    color: Colors.gray300,
  },
  titleContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  maintitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    borderRadius: 10,
    overflow: "hidden",
    height: "auto",
  },
  content: {
    padding: 20,
    backgroundColor: Colors.graycontent,
    flexDirection: "column",
  },
  textContent: {
    fontSize: 14,
    color: "black",
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray62,
  },
  subtext: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
  },
  itemcontainer: {
    marginBottom: 10,
    marginHorizontal: 20,
  },
  copywrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconstyle: {
    padding: 20,
  },
  iconcontainer: {
    flexDirection: "row",
    width: "auto",
  },
  imgStyle: {
    marginLeft: 5,
  },
});
