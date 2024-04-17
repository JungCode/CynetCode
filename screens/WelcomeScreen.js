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
          <Text style={styles.des}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
            reiciendis voluptate cum adipisci ducimus voluptas, atque possimus
            necessitatibus ea? Hic incidunt accusantium molestiae suscipit
            consequuntur voluptate maxime dolores ut accusamus!
          </Text>
        </View>
        <View>
          <CusButton onPress={switchlogin}>Login</CusButton>
          <CusButton
            onPress={switchsignup}
            color={Colors.green500}
            bgc={"white"}
            pressedbgc={Colors.gray200}>
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
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  des: {
    lineHeight: 25,
    color: Colors.gray300,
    marginBottom: 20,
  },
});
