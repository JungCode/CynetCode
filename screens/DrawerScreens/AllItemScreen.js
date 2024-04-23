import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import MyFab from "../../components/MyFab";
import { useContext, useEffect, useState } from "react";
import { fetchItems } from "../../util/http";
import { AuthContext } from "../../store/auth-context";
import Item from "../../components/Item";
import LoadingOverlay from "../../components/LoadingOverlay";
function AllItemScreen({ onPress }) {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    setIsFetchedItems(true);
    async function getItems() {
      const data = await fetchItems(authCtx.userId);
      setFetchedItems(data);
      setIsFetchedItems(false);
    }
    getItems();
  }, [authCtx]);
  if (isFetchedItems) {
    return <LoadingOverlay message="Loading..." />;
  }
  if (!fetchedItems) {
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
        renderItem={({ item }) => <Item item={item}>{item.webName}</Item>}
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
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
  },
});
