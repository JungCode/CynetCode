import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../IconButton";
import { useNavigation } from "@react-navigation/native";
import LoginEmailScreen from "./AuthEmail/LoginEmailScreen";

function AuthContent({ islogin }) {
  const navigation = useNavigation();
  function backNavHandle() {
    navigation.navigate("welcome");
  }
  function authEmailHandle() {
    navigation.navigate("AuthEmailScreen");
  }
  function loginEmailHandle() {
    navigation.navigate("LoginEmailScreen");
  }

  return (
    <>
      <Pressable style={styles.backbutton} onPress={backNavHandle}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </Pressable>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.image}
            source={require("../../image/AppIcon.png")}
          />
          <Text style={styles.title}>
            {islogin ? "Login in CynetCode" : "Signup in CynetCode"}
          </Text>
          <Text style={styles.des}>
            Sign in to My Kaspersky One account to manage all Kaspersky apps and
            features
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            bgc="white"
            icon={require("../../image/icons/search.png")}
            color="black"
            borcolor={Colors.gray200}
            onPress={() => {}}>
            {islogin ? "Login" : "Signup"} with Googel
          </IconButton>
          <IconButton
            icon={require("../../image/icons/facebook.png")}
            bgc="white"
            color="black"
            borcolor={Colors.gray200}>
            {islogin ? "Login" : "Signup"} with Facebook
          </IconButton>
          <IconButton
            icon={require("../../image/icons/apple-logo.png")}
            bgc="white"
            color="black"
            borcolor={Colors.gray200}>
            {islogin ? "Login" : "Signup"} with Apple
          </IconButton>
          <IconButton
            icon={require("../../image/icons/gmail.png")}
            color={"white"}
            onPress={() => {
              if (islogin) {
                return loginEmailHandle();
              } else {
                return authEmailHandle();
              }
            }}>
            {islogin ? "Login" : "Signup"} with Email
          </IconButton>
        </View>
      </View>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 10,
  },
  innerContainer: {
    alignItems: "center",
  },
  image: {
    maxWidth: 150,
    maxHeight: 150,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  des: {
    lineHeight: 25,
    color: Colors.gray300,
    marginTop:20,
    marginBottom: 20,
    textAlign:"center",
  },
  buttonContainer: {
    minWidth: "100%",
    paddingBottom:30,
  },
  backbutton: {
    margin: 10,
  },
});
