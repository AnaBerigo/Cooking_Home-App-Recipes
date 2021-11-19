import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import HeaderReceitas from "../../component/HeaderReceita";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getTodosIngredientes } from "../../service/api";
import Carousel, { Pagination } from "react-native-snap-carousel";
const tela = Dimensions.get("window").width;
const SLIDER_WIDTH = tela * 0.87;
const ITEM_WIDTH = tela * 0.87;

export default function Receita({ route }) {
  //parametros da receita selecionada
  const data = route.params.data;
  const modoPreparo = data.modoPreparo;
  const nomeReceita = data.nome;
  const tempoPreparo = data.tempoPreparo;

  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const renderImage = ({ item }) => (
    <Image style={styles.imagem} source={{ uri: item }} />
  );

  const ingredientsArray = getTodosIngredientes(data.ingredientes);

  const renderIngredient = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={styles.ingredientes}>{item[0].nome}</Text>
      <Text style={styles.qntIngredientes}>{item[1]}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoFolha.png")}
      >
        <HeaderReceitas />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerReceitas}>
            <View style={styles.carouselContainer}>
              <Carousel
                ref={isCarousel}
                data={data.photosArray}
                renderItem={renderImage}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideShift={0}
                loop={false}
                firstItem={0}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
              />
              <Pagination
                dotsLength={data.photosArray.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                containerStyle={styles.paginationContainer}
                dotStyle={{
                  width: 8,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "rgba(124, 181, 24, 0.80)",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>

            <View style={styles.viewTitulo}>
              <Text style={styles.titulo}>{nomeReceita}</Text>
            </View>
            <View style={styles.infos}>
              <MaterialCommunityIcons name="alarm" size={25} color="#F86E10" />
              <Text style={styles.desc}>{tempoPreparo}min</Text>
            </View>
            <Text style={styles.textIngredientes}>INGREDIENTES</Text>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={ingredientsArray}
              renderItem={renderIngredient}
            />
            <Text style={styles.textIngredientes}>MODO DE PREPARO</Text>
            <View>
              <Text style={styles.modoPreparo}>{modoPreparo}</Text>
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  carouselContainer: {
    minHeight: 250,
  },
  imagem: {
    width: ITEM_WIDTH,
    height: 300,
    borderRadius: 13,
    marginBottom: 10,
  },
  paginationContainer: {
    flex: 1,
    alignSelf: "center",
    paddingVertical: 8,
  },
  containerReceitas: {
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
  receitas: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
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
  textIngredientes: {
    backgroundColor: "#F86E10",
    marginVertical: "7%",
    marginLeft: "2.5%",
    width: tela * 0.5,
    height: tela * 0.15,
    color: "#ffffff",
    fontFamily: fonts.bold,
    textAlign: "center",
    paddingVertical: "4%",
    fontSize: tela * 0.05,
  },
  ingredientes: {
    fontFamily: fonts.semibold,
    color: "#7CB518",
    textAlign: "center",
    marginLeft: 19,
  },
  qntIngredientes: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: "#7CB518",
    textAlign: "center",
  },
  modoPreparo: {
    marginHorizontal: 19,
    fontFamily: fonts.medium,
    color: "#7CB518",
    marginBottom: 15,
  },
});
