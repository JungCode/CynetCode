import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import CusButton from "../../components/CusButton";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useState } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import ExtractGooglemapLink from "../../components/ExtractGooglemapLink";
function AddressAddingScreen() {
  const navigation = useNavigation();

  function submitHandler() {
    navigation.navigate("drawerScreen");
  }
  const [regigion, setRegigion] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: null,
    longitudeDelta: null,
  });
  const [maplink, setMaplink] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [marker, setMarker] = useState(null);

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
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Name"
        style={styles.inputStyle}
      />
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Address"
        style={styles.inputStyle}
      />
      <TextInput
        mode="outlined"
        activeOutlineColor={Colors.green500}
        label="Google map link"
        value={maplink}
        style={styles.inputStyle}
      /> 

      <View style={styles.mapcontainer}>
        <MapView
          style={styles.map}
          region={regigion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          onPress={handleMapPress}>
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
