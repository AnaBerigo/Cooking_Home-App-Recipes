import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import {
  getArraysIngredientes,
  getReceitasPorIngredientes,
} from "../../service/api";
import { useNavigation } from "@react-navigation/native";
import ReceitasMiniatura from "../../component/ReceitasMiniatura";
import IconBack from "../../component/IconBack";
const tela = Dimensions.get("window").width;
const SUBLINHADO_WIDTH = tela * 0.8;

export default function IngredienteEspecifico({ route }) {
  const itemArray = route.params;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoIng.png")}
      >
        <IconBack />
        <View style={styles.containerIng}>
          <View
            style={{
              borderBottomColor: "#F86E10",
              borderBottomWidth: 2,
              alignSelf: "center",
              marginBottom: 10,
              width: SUBLINHADO_WIDTH,
            }}
          >
            <Text style={styles.titulo}>Receitas Encontradas</Text>
          </View>
          <ScrollView>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={getArraysIngredientes(itemArray)}
              renderItem={({ item }) => <ReceitasMiniatura data={item} />}
            />
          </ScrollView>
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
  containerIng: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginTop: 10,
  },
  titulo: {
    fontFamily: fonts.bold,
    color: "#7CB518",
    textAlign: "center",
    marginVertical: 13,
    fontSize: 20,
  },
  imagemIng: {
    width: tela,
    height: 100,
  },
  receitas: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 30,
    marginHorizontal: 10,
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  tituloRec: {
    fontFamily: fonts.semibold,
    textAlign: "center",
    color: "#F86E10",
    fontSize: 15,
    marginBottom: 13,
    paddingHorizontal: 14,
  },
  descRec: {
    fontFamily: fonts.medium,
    textAlign: "center",
    color: "#F86E10",
  },
  icons: {
    marginRight: 10,
  },
  imagemRec: {
    width: "100%",
    height: 160,
    marginBottom: 10,
  },
});
