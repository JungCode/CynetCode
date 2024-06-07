import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from "react-native";

export default function ScanQRCodeScreen() {
  const route = useRoute();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const overlaySize = screenWidth * 0.8;
  const overlayTop = (screenHeight - overlaySize) / 2;
  const overlayLeft = (screenWidth - overlaySize) / 2;
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (hasPermission === false) {
    // Camera permissions are not granted.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
          }}
          title="Grant Permission"
        />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const url = new URL(data);
    console.log(data);
    route.params.twoFactorKey = url.searchParams.get("secret");
    console.log(route.params);
    if(route.params.webURL != undefined){
      navigation.navigate("websiteAddingScreen", route.params);
    }else{
      navigation.navigate("appAddingScreen", route.params);
    }
    // Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`);
    // Perform additional actions with the scanned data here
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlayTop} />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.overlaySideLeft} />
          <View style={styles.square} />
          <View style={styles.overlaySideRight} />
        </View>
        <View style={styles.overlayBottom} />
      </Camera>
      {scanned && (
        <View style={styles.scanAgainContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.text}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 3/4,
  },
  overlayTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height:
      (Dimensions.get("window").height - Dimensions.get("window").width * 1.2) /
      2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  overlaySideLeft: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: Dimensions.get("window").width * 0.8,
    width:
      (Dimensions.get("window").width - Dimensions.get("window").width * 0.8) /
      2,
    position: "absolute",
    top:
      (Dimensions.get("window").height - Dimensions.get("window").width * 1.2) /
      2,
  },
  overlaySideRight: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: Dimensions.get("window").width * 0.8,
    width:
      (Dimensions.get("window").width - Dimensions.get("window").width * 0.8) /
      2 + 186,
    position: "absolute",
    top:
      (Dimensions.get("window").height - Dimensions.get("window").width * 1.2) /
      2,
    right: 0,
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height:
      (Dimensions.get("window").height -
        Dimensions.get("window").width * 0.697) /
      2,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  square: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").width * 0.8,
    borderColor: "white",
    borderWidth: 2,
    position: "absolute",
    top:
      (Dimensions.get("window").height - Dimensions.get("window").width * 1.2) /
      2,
    bottom: 0,
    left:
      (Dimensions.get("window").width - Dimensions.get("window").width * 0.8) /
      2,
    right: 0,
  },
  scanAgainContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
