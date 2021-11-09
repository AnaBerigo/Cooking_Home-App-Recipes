import React, { useContext } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/auth";
import IconBack from "../IconBack";
const tela = Dimensions.get("window").width;
const WIDTH = tela * 0.3;
const HEIGTH = tela * 0.3;

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <View>
      <Image
        style={styles.imgCabecalho}
        source={require("../../img/CabecalhoVerde.png")}
      />
      <View style={styles.avatarView}>
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
      </View>
      <IconBack />
    </View>
  );
}
const styles = StyleSheet.create({
  imgCabecalho: {
    zIndex: 1,
    width: tela,
    height: tela * 0.5,
  },
  avatarView: {
    position: "absolute",
    left: 15,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: WIDTH,
    height: HEIGTH,
    zIndex: 10,
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
  avatarIcon: {
    width: WIDTH,
    height: HEIGTH,
    borderRadius: 100,
  },
});
