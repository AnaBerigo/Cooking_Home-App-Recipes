import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import { AuthContext } from "../../contexts/auth";
import HeaderPerfil from "../../component/HeaderPerfil";
import { useNavigation } from "@react-navigation/native";
const tela = Dimensions.get("window").width;
const telaH = Dimensions.get("window").height;

export default function Perfil() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  function trocarSenha() {
    navigation.navigate("TrocarSenha");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoBranco.png")}
      >
        <HeaderPerfil />
        <Text style={styles.textoInformativo}>Bem-vindo(a) ao seu perfil</Text>
        <View style={{ marginHorizontal: "5%" }}>
          <Text style={styles.textos}>Nome:</Text>
          <Text style={styles.textos1}>{user && user.nome}</Text>
          <Text style={styles.textos}>E-mail:</Text>
          <Text style={styles.textos1}>{user && user.email}</Text>
          <Text style={styles.textos}>Senha:</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textos1}>********</Text>
            <TouchableOpacity onPress={trocarSenha}>
              <MaterialCommunityIcons name="pencil" size={25} color="#FA8927" />
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.textos1}>Sair da minha conta</Text>
            <TouchableOpacity onPress={signOut}>
              <MaterialCommunityIcons
                name="exit-to-app"
                size={25}
                color="#FA8927"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  textoInformativo: {
    marginVertical: "15%",
    marginHorizontal: "5%",
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: tela * 0.065,
    color: "#333333",
  },
  textos: {
    fontFamily: fonts.semibold,
    fontSize: tela * 0.038,
    color: "#8E908A",
  },
  textos1: {
    marginBottom: "5%",
    fontFamily: fonts.bold,
    fontSize: tela * 0.043,
    color: "#333333",
  },
});
