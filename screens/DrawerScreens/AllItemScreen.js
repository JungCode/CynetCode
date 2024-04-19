import {
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
function AllItemScreen({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your security store is empty</Text>
      <ScrollView></ScrollView>
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
