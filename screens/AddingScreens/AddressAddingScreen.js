import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Alert,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import CusButton from "../../components/CusButton";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useContext, useState } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import ExtractGooglemapLink from "../../components/ExtractGooglemapLink";
import { AuthContext } from "../../store/auth-context";
import { ItemsContext } from "../../store/items-context";
function AddressAddingScreen() {
  const authCtx = useContext(AuthContext);
  const itemsCtx = useContext(ItemsContext);
  const route = useRoute();

  const navigation = useNavigation();
  const [regigion, setRegigion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  const [maplink, setMaplink] = useState(
    route.params ? route.params.mapLink : ""
  );
  const [name, setName] = useState(
    route.params ? route.params.addressName : ""
  );
  const [addressDetail, setAddressDetail] = useState(
    route.params ? route.params.addressDetail : ""
  );
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [marker, setMarker] = useState(null);

  function submitHandler() {
    const addressItem = {
      addressName: name,
      addressDetail: addressDetail,
      mapLink: maplink,
      userId: authCtx.userId,
      favorite: route.params ? route.params.favorite : false,
    };
    if (route.params) {
      itemsCtx.updateItem(route.params.id, addressItem, "addressItems");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Edited item successfull!", ToastAndroid.SHORT);
    } else {
      itemsCtx.storeItem(addressItem, "address");
      navigation.navigate("drawerScreen");
      ToastAndroid.show("Added item successfull!", ToastAndroid.SHORT);
    }
    navigation.navigate("drawerScreen");
  }
  function updateInputValueHandler(key, value) {
    switch (key) {
      case "name":
        setName(value);
        break;
      case "addressDetail":
        setAddressDetail(value);
        break;
      case "link":
        setMaplink(value);
        break;
      default:
        break;
    }
  }

  function handleMapPress(event) {
    const coordinate = event.nativeEvent.coordinate;
    console.log(coordinate);
    setMarker({
      coordinate: coordinate,
    });
    setMaplink(
      `https://www.google.com/maps?q=${coordinate.latitude},${coordinate.longitude}`
    );
  }
  function onChangeHandler(type, value) {}
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegigion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={name}
        onChangeText={(text) => {
          updateInputValueHandler("name", text);
        }}
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Name"
        style={styles.inputStyle}
      />
      <TextInput
        value={addressDetail}
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Address"
        style={styles.inputStyle}
        onChangeText={(text) => {
          updateInputValueHandler("addressDetail", text);
        }}
      />
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Google map link"
        value={maplink}
        style={styles.inputStyle}
        onChangeText={(text) => {
          updateInputValueHandler("link", text);
        }}
      />

      <View style={styles.mapcontainer}>
        <MapView
          style={styles.map}
          region={regigion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          onPress={handleMapPress}
        >
          {marker && (
            <Marker
              coordinate={marker.coordinate}
              title="Selected Location"
              description="This is where you clicked"
            />
          )}
        </MapView>
      </View>
      <CusButton onPress={submitHandler}>Save</CusButton>
    </ScrollView>
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
  mapcontainer: {
    width: "100%",
    height: 400,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
