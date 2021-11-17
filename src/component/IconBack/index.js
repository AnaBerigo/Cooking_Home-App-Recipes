import React from "react";
import { TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;
const WIDTH_icone = tela * 0.1;
const HEIGTH_icone = tela * 0.1;

export default function IconBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconeBack}
      onPress={() => navigation.goBack()}
    >
      <MaterialCommunityIcons name="arrow-left" size={25} color="#95C346" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconeBack: {
    position: "absolute",
    left: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH_icone,
    height: HEIGTH_icone,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    zIndex: 10,
  },
});
