import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import MyFab from "../../components/MyFab";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/auth-context";
import LoadingOverlay from "../../components/LoadingOverlay";
import ItemAcordition from "../../components/Accordions/ItemAcordition";
import { ItemsContext } from "../../store/items-context";
function AllItemScreen({ onPress }) {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isFetchedItems, setIsFetchedItems] = useState(false);
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  useEffect(() => {
    setIsFetchedItems(true);
    async function getItems() {
      const data = await itemsCtx.fetchItemsCtx(authCtx.userId);
      setFetchedItems(data);
      setIsFetchedItems(false);
    }
    getItems();
  }, [itemsCtx.refresh]);
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
        renderItem={({ item }) => (
          <ItemAcordition value={item}>{item.webName}</ItemAcordition>
        )}
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
  },
});
