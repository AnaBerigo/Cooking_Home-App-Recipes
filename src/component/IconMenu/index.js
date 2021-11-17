import React from "react";
import { TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function IconMenu() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconeMenu}
      onPress={() => navigation.openDrawer()}
    >
      <MaterialCommunityIcons name="menu" size={25} color="#95C346" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  iconeMenu: {
    position: "absolute",
    left: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: tela * 0.1,
    height: tela * 0.1,
    backgroundColor: "#ffffff",
    //borderWidth: 1.5,
    //borderColor: "#7CB518",
    borderRadius: 100,
    zIndex: 10,
  },
});
