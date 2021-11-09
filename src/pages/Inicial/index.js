import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../assets/fonts/fonts";

export default function Inicial() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoVerde.png")}
      >
        <ScrollView>
          <View style={styles.containerCentro}>
            <View style={styles.containerCentroRow}>
              <Image
                style={styles.img}
                source={require("../../img/Passionate-cuate.png")}
              />
              {/* https://storyset.com/illustration/passionate/cuate#F86E10FF&hide=&hide=complete */}
              <View style={styles.containerTexto}>
                <Image
                  style={styles.logo}
                  source={require("../../img/Logo.png")}
                />
                <Text style={styles.texto}>
                  Bem-vindo ao CookingHome, seu aplicativo de receitas.
                </Text>
              </View>
            </View>

            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.botaoCadastro}
                onPress={() => navigation.navigate("SignUp")}
              >
                <View style={styles.btnAreaCadastro}>
                  <Text style={styles.btnTextoCadastro}>Sou Novo</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.botaoLogin}
                onPress={() => navigation.navigate("SignIn")}
              >
                <View style={styles.btnAreaLogin}>
                  <Text style={styles.btnTextoLogin}>Já Tenho Conta</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "95%",
    height: "85%",
    padding: "10%",
    marginHorizontal: "2.5%",
    marginTop: "25%",
  },
  containerCentroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "90%",
    height: 360,
    marginBottom: "-10%",
    marginTop: "-15%",
    zIndex: 1,
  },
  logo: {
    width: "55%",
    height: "27%",
  },
  containerTexto: {
    marginLeft: "-45%",
    marginBottom: "10%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "60%",
    height: "30%",
    zIndex: 9,
  },
  texto: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: fonts.medium,
  },
  btnView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoCadastro: {
    width: 271,
    height: 56,
    borderWidth: 2,
    backgroundColor: "#F86E10",
    borderColor: "#F86E10",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  btnAreaCadastro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextoCadastro: {
    fontSize: 18,
    color: "#fff",
    fontFamily: fonts.bold,
  },
  botaoLogin: {
    marginTop: 12,
    width: 271,
    height: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnAreaLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextoLogin: {
    fontSize: 18,
    color: "#F86E10",
    fontFamily: fonts.bold,
  },
});
