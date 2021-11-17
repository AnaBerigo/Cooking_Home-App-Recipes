import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../assets/fonts/fonts";
const tela = Dimensions.get("window").width;
const telaH = Dimensions.get("window").height;

export default function Inicial() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoVerdeClaro.png")}
      >
        <View style={styles.containerCentro}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.containerImg}>
              <Image
                style={styles.img}
                source={require("../../img/Passionate-cuate1.png")}
              />
            </View>
            <View style={styles.containerTexto}>
              <Text style={styles.texto}>
                Bem-vindo ao CookingHome, seu aplicativo de receitas.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.botaoCadastro}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.btnTextoCadastro}>Sou Novo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoLogin}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.btnTextoLogin}>Já Tenho Conta</Text>
          </TouchableOpacity>
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
  containerCentro: {
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: tela * 0.95,
    flex: 1,
    marginVertical: "25%",
  },
  img: {
    width: tela * 0.6,
    height: telaH * 0.385,
    zIndex: 1,
  },
  texto: {
    textAlign: "right",
    fontSize: tela * 0.038,
    fontFamily: fonts.medium,
  },
  containerTexto: {
    marginTop: "20%",
    width: tela * 0.4,
    height: telaH * 0.2,
    zIndex: 9,
    marginLeft: "-40%",
  },
  containerImg: {
    width: tela * 0.8,
    height: telaH * 0.385,
    marginLeft: "-12%",
  },
  botaoCadastro: {
    alignItems: "center",
    justifyContent: "center",
    width: tela * 0.7,
    height: telaH * 0.09,
    backgroundColor: "#F86E10",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 12,
  },
  btnTextoCadastro: {
    fontSize: tela * 0.054,
    color: "#fff",
    fontFamily: fonts.bold,
  },
  botaoLogin: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    width: tela * 0.7,
  },
  btnTextoLogin: {
    fontSize: tela * 0.054,
    color: "#F86E10",
    fontFamily: fonts.bold,
  },
});
