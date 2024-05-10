import { StyleSheet, Text, View } from "react-native";
import CheckerDetail from "../../components/PasswordChecker/CheckerDetail";
import CheckerForm from "../../components/PasswordChecker/CheckerForm";

function CheckerItemDetail() {
  return (
    <View style={styles.container}>
      <CheckerDetail
        weak={true}
        duplicate={true}
        compromised={true}
        good={true}></CheckerDetail>
      <View>
        <CheckerForm website="youtube"></CheckerForm>
      </View>
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
});
