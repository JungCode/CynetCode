import {
  Image,
  Platform,
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
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { firebaseConfig } from "../../util/https-fetch";
import * as OpenAnything from "react-native-openanything";
import * as IntentLauncher from "expo-intent-launcher";
function FileAcordition({
  value,
  handlePresentModal,
  setIsFetchedItems,
  imageName,
}) {
  //dropdown js
  const listRef = useAnimatedRef();
  const [imageURL, setImageURL] = useState(
    "https://img.freepik.com/free-vector/loading-circles-blue-gradient_78370-2646.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1715472000&semt=sph"
  );
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
  useEffect(() => {
    async function getFile() {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const storageRef = firebase.storage().ref();

      try {
        // Lấy đường dẫn của ảnh trong Firebase Storage
        const imageUrl = await storageRef
          .child("files/" + imageName)
          .getDownloadURL();
        setImageURL(imageUrl);
      } catch (error) {
        console.error("Error displaying image:", error);
      }
    }
    getFile();
  }, []);
  const fecthedImg =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png";
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
            {value.fileType === "photo" ? (
              <Icon source="file-image-outline" size={35}></Icon>
            ) : value.fileType === "pdf" ? (
              <Icon source="file-pdf-box" size={35}></Icon>
            ) : value.fileType === "word" ? (
              <Icon source="file-word-box" size={35}></Icon>
            ) : null}
          </View>
          {/* <Image source={{ uri: fecthedImg }} style={styles.imgStyle} /> */}
          <View style={styles.textTitleContainer}>
            <Text style={styles.textTitle}>{value.fileTitle}</Text>
            <Text style={styles.suburl}>File</Text>
          </View>
        </View>
        <Pressable
          onPress={handlePresentModal.bind(
            this,
            {
              ...value,
              icon:
                value.fileType === "photo"
                  ? "file-image-outline"
                  : value.fileType === "pdf"
                  ? "file-pdf-box"
                  : value.fileType === "word"
                  ? "file-word-box"
                  : null,
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
                <Text style={styles.subtitle}>{value.fileDescription}</Text>
              </View>
              <View style={styles.copywrap}></View>
            </View>
            <View style={styles.imageContainer}>
              {value.fileType === "photo" ? (
                <Image source={{ uri: imageURL }} style={styles.image} />
              ) : value.fileType === "pdf" ? (
                <Icon source="file-pdf-box" size={35} onPress={() => {}}></Icon>
              ) : value.fileType === "word" ? (
                <Icon source="file-word-box" size={35}></Icon>
              ) : null}
            </View>
            <FlatButton
              onPress={() => {
                if (value.fileType === "pdf") {
                  if (Platform.OS === "ios") {
                    WebBrowser.dismissBrowser();
                    WebBrowser.openBrowserAsync(imageURL);
                  } else {
                    IntentLauncher.startActivityAsync(
                      "android.intent.action.VIEW",
                      {
                        type: "application/pdf",
                        data: imageURL,
                      }
                    );
                  }
                }
                if (value.fileType === "photo") {
                  if (Platform.OS === "ios") {
                    WebBrowser.dismissBrowser();
                    WebBrowser.openBrowserAsync(imageURL);
                  } else {
                    IntentLauncher.startActivityAsync(
                      "android.intent.action.VIEW",
                      {
                        type: "image/*",
                        data: imageURL,
                      }
                    );
                  }
                }
                if (value.fileType === "word") {
                  if (Platform.OS === "ios") {
                    WebBrowser.dismissBrowser();
                    WebBrowser.openBrowserAsync(imageURL);
                  } else {
                    IntentLauncher.startActivityAsync(
                      "android.intent.action.VIEW",
                      {
                        type: "aapplication/msword",
                        data: imageURL,
                      }
                    );
                  }
                }
              }}
            >
              Open
            </FlatButton>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default FileAcordition;
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
  container: {
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
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  imgStyle: {
    marginLeft: 5,
  },
});
