import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import CusButton from "../../components/CusButton";

function AddressAddingScreen() {
  const navigation = useNavigation();

  function submitHandler() {
    navigation.navigate("drawerScreen");
  }
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Title"
        style={styles.inputStyle}
        onChangeText={(text) => {
          updateInputValueHandler("fileTitle", text);
        }}
      />
      <CusButton onPress={submitHandler}>Save</CusButton>
    </View>
  );
}
export default AddressAddingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 25,
  },
  inputStyle: {
    backgroundColor: "white",
    marginBottom: 13,
  },
  paragraphStyle: {
    height: 100,
  },
  image: {
    height: 100,
    width: 100,
  },
});
