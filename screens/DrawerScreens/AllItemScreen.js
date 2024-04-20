import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MyFab from "../../components/MyFab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CardScreen from "./CardScreen";
import { useContext, useEffect, useState } from "react";
import { fetchItems } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
function AllItemScreen({ onPress }) {
  const [fetchedItems, setFetchedItems] = useState([]);

  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getItems() {
      const items = await fetchItems(authCtx.userId);
      console.log(items);
      setFetchedItems(items);
    }
    getItems();
  }, [authCtx,onPress]);
  if (!fetchItems) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your security store is empty</Text>
        <ScrollView></ScrollView>
        <MyFab onPress={onPress} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={fetchedItems}
        renderItem={({ item }) => <Text>{item.webName}</Text>}
        keyExtractor={(item) => item.id}
      />
      <MyFab onPress={onPress} />
    </View>
  );
}

export default AllItemScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
  },
});
