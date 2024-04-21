import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, View } from "react-native";
import { webDeleteItem } from "../util/http";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { List } from "react-native-paper";
import Colors from "../constants/Colors";

function Item({ children, item }) {
  const navigation = useNavigation();
  authCtx = useContext(AuthContext);
  function deleteHandler() {
    webDeleteItem(item.id);
    authCtx.userItemsHandler(item);
  }

  // const [expanded, setExpanded] = useState(true);

  // const handlePress = () => setExpanded(!expanded);
  return (
    // <List.Section>
    //   <List.Accordion
    //     title={children}
    //     rippleColor={Colors.gray200}
    //     titleStyle={styles.title}
    //     left={(props) => <List.Icon {...props} color={ Colors.green500} icon="pen" /> }>
    //     <List.Item title={item.accountName} />
    //     <List.Item title={item.password} />
    //   </List.Accordion>
    // </List.Section>
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
  title:{
    color: Colors.green500,
  },
});
