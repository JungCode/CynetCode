import { StyleSheet, Text, View } from "react-native";
import CusButton from "../components/CusButton";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import FlatButton from "../components/FlatButton";



function WelcomeScreen() {
  const navigation = useNavigation();

  function switchlogin() {
    navigation.replace("login");
  }
  function switchsignup() {
    navigation.replace("signup");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Do you have a CynetCode account yet?</Text>
        <View>
          <Text style={[styles.des,{marginBottom:10,}]}>
            One account for all services of CynetCode
          </Text>
          <Text style={styles.des}>With this account, you can:</Text>
          <Text style={styles.des}>
            · Recover your password if something goes wrong with Your mobile
            device
          </Text>
          <Text style={styles.des}>· Access your data in the browser from</Text>
          <Text style={styles.des}>
            · Automatically backup and synchronize data on all your devices
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <CusButton onPress={switchlogin}>Login</CusButton>
          <CusButton
            onPress={switchsignup}
            color={Colors.green500}
            borcolor={"transparent"}
            bgc={"white"}
            pressedbgc={Colors.gray100}>
            Sign Up
          </CusButton>
        </View>
      </View>
      <FlatButton style={styles.skip}>Skip</FlatButton>
    </View>
  );
}

export default WelcomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    lineHeight:50,
    paddingHorizontal: 10,
  },
  des: {
    fontSize:15,
    lineHeight: 25,
    color: Colors.gray300,
    textAlign: "justify",
  },
  buttonContainer:{
    marginTop:30,
  }
});
