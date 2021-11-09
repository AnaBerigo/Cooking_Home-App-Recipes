import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import IconBack from "../IconBack";
const tela = Dimensions.get("window").width;
const WIDTH = tela * 0.85;
const HEIGTH = tela * 0.2;

export default function Header() {
  return (
    <View>
      <IconBack />
      <Image
        style={styles.imgCabecalho}
        source={require("../../img/CabecalhoBranco.png")}
      />
      <Image style={styles.logo} source={require("../../img/LogoBranca.png")} />
    </View>
  );
}
const styles = StyleSheet.create({
  imgCabecalho: {
    zIndex: 1,
    width: tela,
    height: tela * 0.4,
  },
  logo: {
    width: WIDTH,
    height: HEIGTH,
    position: "absolute",
    left: 10,
    bottom: 10,
    zIndex: 9,
  },
});
