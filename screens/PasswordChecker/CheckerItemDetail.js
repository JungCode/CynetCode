import { Linking, StyleSheet, Text, View } from "react-native";
import CheckerDetail from "../../components/PasswordChecker/CheckerDetail";
import CheckerForm from "../../components/PasswordChecker/CheckerForm";
import CusButton from "../../components/CusButton";
import Colors from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

function CheckerItemDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  function onPressEdit() {
    navigation.navigate("websiteAddingScreen", route.params.item);
  }
  function onPressWeb(webURL) {
    Linking.openURL("https://" + webURL);
  }
  return (
    <View style={styles.container}>
      <CheckerDetail
        weak={route.params.weak}
        duplicate={route.params.duplicate}
        compromised={route.params.compromised}
        good={route.params.strong}
      ></CheckerDetail>
      <View style={styles.formcontainer}>
        <CheckerForm
          app={route.params.item.webName}
          userName={route.params.item.userName}
          password={route.params.item.password}
        ></CheckerForm>
      </View>
      <CusButton onPress={onPressWeb.bind(this,route.params.item.webURL)}>Change password on website</CusButton>
      <CusButton
        onPress={onPressEdit}
        bgc="transparent"
        borcolor="transparent"
        pressedbgc={Colors.gray200}
        color={Colors.green500}
      >
        Edit Account
      </CusButton>
    </View>
  );
}

export default CheckerItemDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  formcontainer: {
    marginBottom: 20,
  },
});
