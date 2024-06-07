import { Camera } from "expo-camera";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraButton from "../components/CameraButton";
import { useNavigation } from "@react-navigation/native";

export default function TakingPicture() {
  const [hasPermission, setHasPermission] = useState(null);
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
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

  function toggleCameraFacing() {
    setFacing((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  function toggleFlashMode() {
    setFlashMode((current) => {
      if (current === Camera.Constants.FlashMode.off) {
        return Camera.Constants.FlashMode.on;
      } else if (current === Camera.Constants.FlashMode.on) {
        return Camera.Constants.FlashMode.auto;
      } else if (current === Camera.Constants.FlashMode.auto) {
        return Camera.Constants.FlashMode.torch;
      } else {
        return Camera.Constants.FlashMode.off;
      }
    });
  }
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          ratio="20:9"
          style={styles.camera}
          type={facing}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <Text></Text>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View style={styles.buttonContainer}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <CameraButton
              title="Re-take"
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <CameraButton
              title="Save"
              icon="check"
              onPress={() => navigation.navigate("fileAddingScreen", {uri:image})}
            />
          </View>
        ) : (
          <CameraButton
            title="Take a picture"
            icon="camera"
            onPress={takePicture}
          ></CameraButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: "black",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
