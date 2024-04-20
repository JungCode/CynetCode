import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { webDeleteItem } from "../util/http";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function Item({ children, item }) {
  const navigation = useNavigation();
  authCtx = useContext(AuthContext);
  function deleteHandler() {
    webDeleteItem(item.id);
    authCtx.userItemsHandler(item);
  }
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
      <Button
        title="Modify"
        onPress={() => navigation.navigate("websiteAddingScreen", item)}
      />
      <Button title="Delete" onPress={deleteHandler} />
    </View>
  );
}
export default Item;
const styles = StyleSheet.create({
  container: {
    height: 300,
  },
});
