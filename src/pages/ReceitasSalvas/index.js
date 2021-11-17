import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import HeaderReceita from "../../component/HeaderReceita";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function ReceitasSalvas({ route }) {
  //parametros da receita selecionada
  const data = route.params.data;
  const modoPreparo = data.modoPreparo;
  const nomeReceita = data.nomeReceita;
  const tempoPreparo = data.tempoPreparo;
  const imagem = data.imagemReceita;
  const date = data.date;
  const ingredientes = data.ingredientes;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoFolha.png")}
      >
        <HeaderReceita />
        <View style={styles.containerReceitas}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewTitulo}>
              <Image style={styles.imagem} source={{ uri: imagem }} />
            </View>
            <View style={styles.viewTitulo}>
              <Text style={styles.titulo}>{nomeReceita}</Text>
            </View>
            <View style={styles.infos}>
              <MaterialCommunityIcons name="alarm" size={25} color="#F86E10" />
              <Text style={styles.desc}>{tempoPreparo}</Text>
            </View>
            <View style={styles.infos}>
              <MaterialCommunityIcons
                name="calendar"
                size={25}
                color="#F86E10"
              />
              <Text style={styles.desc}>{date}</Text>
            </View>
            <View style={styles.viewIngredientes}>
              <Text style={styles.textIngredientes}>INGREDIENTES</Text>
            </View>
            <View>
              <Text style={styles.modoPreparo}>{ingredientes}</Text>
            </View>
            <View style={styles.viewIngredientes}>
              <Text style={styles.textIngredientes}>MODO DE PREPARO</Text>
            </View>
            <View>
              <Text style={styles.modoPreparo}>{modoPreparo}</Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  imagem: {
    width: tela * 0.87,
    height: 300,
    borderRadius: 13,
    marginBottom: 10,
  },
  containerReceitas: {
    flex: 1,
    marginHorizontal: "5%",
    marginTop: "1.5%",
    padding: 5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  infos: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  viewTitulo: {
    marginTop: 10,
  },
  titulo: {
    fontFamily: fonts.bold,
    color: "#F86E10",
    fontSize: 22,
    marginBottom: 8,
    textAlign: "center",
  },
  desc: {
    margin: 10,
    fontFamily: fonts.medium,
    fontSize: 17,
    color: "#7CB518",
    textAlign: "center",
    alignItems: "center",
  },
  viewIngredientes: {
    backgroundColor: "#F86E10",
    marginVertical: "7%",
    marginLeft: "2.5%",
    width: tela * 0.5,
    height: tela * 0.15,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textIngredientes: {
    color: "#ffffff",
    fontFamily: fonts.bold,
    textAlign: "center",
    fontSize: tela * 0.05,
  },
  modoPreparo: {
    marginHorizontal: 19,
    fontFamily: fonts.medium,
    color: "#7CB518",
    marginBottom: 15,
  },
});
