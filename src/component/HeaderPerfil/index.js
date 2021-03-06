import React, { useContext } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { AuthContext } from "../../contexts/auth";
import IconMenu from "../IconMenu";
const tela = Dimensions.get("window").width;

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <View>
      <Image
        style={styles.imgCabecalho}
        source={require("../../img/CabecalhoVerde.png")}
      />
      <Image
        style={styles.avatarIcon}
        source={
          user && user.sexo == "m"
            ? require("../../img/AvatarMasculino.png")
            : user && user.sexo == "n"
            ? require("../../img/AvatarIndefinido.png")
            : require("../../img/AvatarFeminino.png")
        }
      />
      <IconMenu />
    </View>
  );
}
const styles = StyleSheet.create({
  imgCabecalho: {
    zIndex: 1,
    width: tela,
    height: tela * 0.52,
  },
  avatarIcon: {
    position: "absolute",
    left: 15,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: tela * 0.3,
    height: tela * 0.3,
    zIndex: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
});
