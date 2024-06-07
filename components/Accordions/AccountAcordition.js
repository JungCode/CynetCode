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
import CusButton from "../CusButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import TwoFADisplay from "../TwoFADisplay";
function AccountAcordition({
  openInBrowser,
  value,
  handlePresentModal,
  setIsFetchedItems,
}) {
  const navigation = useNavigation();
  //dropdown js
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );
  const [fecthedImg, setFetchedImg] = useState("");
  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [0, heightValue.value],
      Extrapolate.CLAMP
    ),
  }));
  const checkFaviconExistence = async (url) => {
    try {
      const response = await fetch("http://" + url + "/favicon.ico");
      setFetchedImg("http://" + url + "/favicon.ico");
    } catch (error) {
      setFetchedImg("https://cdn-icons-png.flaticon.com/512/72/72626.png");
    }
  };
  let IMGAPP;
  if (value.webName != undefined) {
    checkFaviconExistence(value.webURL);
    if (!fecthedImg)
      setFetchedImg("https://cdn-icons-png.flaticon.com/512/72/72626.png");
  } else if (value.appName != undefined) {
    IMGAPP =
      "https://cdn.icon-icons.com/icons2/2483/PNG/512/application_icon_149973.png";
  }
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
          {value.webName ? (
            <View style={styles.imgStyle}>
              <Image
                source={{
                  uri: value.appName
                    ? IMGAPP
                    : value.webName
                    ? fecthedImg
                    : null,
                }}
                style={styles.imgStyle}
              />
            </View>
          ) : (
            <View style={styles.imgStyle}>
              <Icon
                source="view-grid-outline"
                size={35}
                style={styles.imgStyle}
              ></Icon>
            </View>
          )}
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>
              {value.appName
                ? value.appName
                : value.webName
                ? value.webName
                : null}
            </Text>
            {value.webURL != undefined ? (
              <Text style={styles.suburl}>{value.webURL}</Text>
            ) : (
              <Text style={styles.suburl}>Application</Text>
            )}
          </View>
        </View>
        <Pressable
          onPress={handlePresentModal.bind(
            this,
            {
              ...value,
              icon: value.appName ? "view-grid-outline" : fecthedImg,
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
                <Text style={styles.subtitle}>Username</Text>
              </View>
              <View style={styles.copywrap}>
                <Text style={styles.subtext}>{value.userName}</Text>
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
                <Text style={styles.subtitle}>Password</Text>
              </View>
              <View style={styles.copywrap}>
                <TextInput
                  value={value.password}
                  secureTextEntry
                  style={styles.subtext}
                ></TextInput>
                <Pressable>
                  <Icon
                    style={styles.iconstyle}
                    source="content-copy"
                    size={25}
                  ></Icon>
                </Pressable>
              </View>
            </View>
            {value.twoFactorKey != undefined ? (
              <TwoFADisplay secretKey={value.twoFactorKey}></TwoFADisplay>
            ) : null}
            {value.webURL ? (
              <CusButton onPress={openInBrowser.bind(this, value.webURL)}>
                Open in browser
              </CusButton>
            ) : null}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default AccountAcordition;
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
  imgStyle: {
    marginHorizontal: 10,
    width: 35,
    height: 35,
  },
});
