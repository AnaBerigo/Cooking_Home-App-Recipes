import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import IconBack from "../IconBack";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
const tela = Dimensions.get("window").width;
const WIDTH_icone = tela * 0.1;
const HEIGTH_icone = tela * 0.1;

export default function CameraApp() {
  const navigation = useNavigation();
  //camera
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  //salvar informação da permissão
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      //setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
    //console.log("aqui");
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    //console.log("aqui");
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        alert("Salva com sucesso!");
      })
      .catch((error) => {
        console.log("err", error);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={styles.iconeTrocarCamera}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <MaterialCommunityIcons
              name="camera-retake-outline"
              size={25}
              color="#95C346"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconeCamera} onPress={takePicture}>
            <MaterialCommunityIcons
              name="camera-outline"
              size={25}
              color="#95C346"
            />
          </TouchableOpacity>
          {capturedPhoto && (
            <Modal animationType="slide" transparent={false} visible={open}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 20,
                }}
              >
                <View style={{ margin: 10, flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => setOpen(false)}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={25}
                      color="#F86E10"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={savePicture}
                  >
                    <MaterialCommunityIcons
                      name="upload"
                      size={25}
                      color="#95C346"
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  style={{ width: "100%", height: 450, borderRadius: 20 }}
                  source={{ uri: capturedPhoto }}
                />
              </View>
            </Modal>
          )}
          <IconBack />
        </View>
      </Camera>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  iconeTrocarCamera: {
    position: "absolute",
    right: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH_icone,
    height: HEIGTH_icone,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#7CB518",
    borderRadius: 30,
    zIndex: 10,
  },
  iconeCamera: {
    position: "absolute",
    bottom: 30,
    left: tela * 0.375,
    justifyContent: "center",
    alignItems: "center",
    width: tela * 0.25,
    height: tela * 0.1,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#7CB518",
    borderRadius: 30,
    zIndex: 10,
  },
});
