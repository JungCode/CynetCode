import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
import CusButton from "../CusButton";

function ItemAcordition({ value }) {
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

  function copyText(text) {}
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
        }}>
        <View style={styles.maintitle}>
          <Chevron progress={progress}></Chevron>
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>{value.webName}</Text>
            <Text style={styles.suburl}>{value.webURL}</Text>
          </View>
        </View>
        <Pressable>
          <Icon source="dots-vertical" size={25}></Icon>
        </Pressable>
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View ref={listRef} style={styles.contentContainer}>
          <View style={styles.content}>
            <View style={styles.itemcontainer}>
              <View>
                <Text style={styles.subtitle}>Username</Text>
              </View>
              <View style={styles.copywrap}>
                <Text style={styles.subtext}>{value.accountName}</Text>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}></Icon>
                </Pressable>
              </View>
            </View>
            <View style={styles.itemcontainer}>
              <View>
                <Text style={styles.subtitle}>Password</Text>
              </View>
              <View style={styles.copywrap}>
                <TextInput
                  value={value.password}
                  secureTextEntry
                  style={styles.subtext}></TextInput>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}></Icon>
                </Pressable>
              </View>
            </View>
            <CusButton>Open in browser</CusButton>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default ItemAcordition;
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
});
