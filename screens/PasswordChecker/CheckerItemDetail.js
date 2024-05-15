import { StyleSheet, Text, View } from "react-native";
import CheckerDetail from "../../components/PasswordChecker/CheckerDetail";
import CheckerForm from "../../components/PasswordChecker/CheckerForm";
import CusButton from "../../components/CusButton";
import Colors from "../../constants/Colors";

function CheckerItemDetail() {
  return (
    <View style={styles.container}>
      <CheckerDetail
        weak={true}
        duplicate={true}
        compromised={true}
        good={true}></CheckerDetail>
      <View style={styles.formcontainer}>
        <CheckerForm website="youtube"></CheckerForm>
      </View>
      <CusButton>Change password on website</CusButton>
      <CusButton bgc="transparent" borcolor="transparent"  pressedbgc={Colors.gray200} color={Colors.green500}>Edit Account</CusButton>
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
  formcontainer:{
    marginBottom:20,
  }
});
