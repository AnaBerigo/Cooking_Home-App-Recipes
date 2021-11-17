import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import { ingredientes } from "../../service/receitas";
import { useNavigation } from "@react-navigation/native";
import IconMenu from "../../component/IconMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function Ingredientes() {
  const navigation = useNavigation();

  const [newItem, setNewItem] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [list, setList] = useState(ingredientes);

  function filterDesc(desc) {
    if (desc.length < 15) {
      return desc;
    }
    return `${desc.substring(0, 13)}...`;
  }

  const renderIngredient = ({ item }) => (
    <TouchableOpacity
      style={styles.containerIng}
      onPress={() => inserirItem(item)}
    >
      <Image style={styles.imagem} source={{ uri: item.imagem }} />
      <Text style={styles.titulo}>{filterDesc(item.nome)}</Text>
    </TouchableOpacity>
  );

  const renderArrayIngredient = ({ item }) => (
    <View style={styles.containerArrayIng}>
      <MaterialCommunityIcons
        name="checkbox-marked-outline"
        size={25}
        color="#F86E10"
      />
      <Text style={styles.tituloArray}>{filterDesc(item.nome)}</Text>
    </View>
  );

  function inserirItem(item) {
    if (!newItem.includes(item)) {
      setNewItem([...newItem, item]);
    }
  }

  useEffect(() => {
    if (pesquisa === "") {
      setList(ingredientes);
    } else {
      setList(
        ingredientes.filter(
          (item) => item.nome.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
        )
      );
    }
  }, [pesquisa]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoIng.png")}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
          <View>
            <IconMenu />
            <TextInput
              placeholder={"Qual(is) ingrediente(s) deseja?"}
              autoCorrect={true}
              textContentType={"name"}
              value={pesquisa}
              onChangeText={(texto) => setPesquisa(texto)}
              style={styles.pesquisa}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.ArrayIng}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={newItem}
                  renderItem={renderArrayIngredient}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setNewItem([])}
                    style={styles.botao}
                  >
                    <Text style={styles.btnTexto}>Limpar Lista</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("IngredienteEspecifico", newItem)
                    }
                    style={styles.botao}
                  >
                    <Text style={styles.btnTexto}>Mostrar Receitas</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <FlatList
                style={styles.FlatIng}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                data={list}
                renderItem={renderIngredient}
                keyExtractor={(item) => String(item.ingredienteId)}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
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
  pesquisa: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: tela * 0.8,
    borderRadius: 10,
    height: 50,
    borderWidth: 2,
    borderColor: "#F86E10",
    marginLeft: "15%",
    marginVertical: "3%",
    fontSize: tela * 0.045,
    fontFamily: fonts.medium,
    color: "#333333",
    paddingHorizontal: "3%",
  },
  ArrayIng: {
    marginBottom: "3%",
    marginHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    borderColor: "#F86E10",
    borderWidth: 2,
  },
  containerArrayIng: {
    flex: 1,
    paddingHorizontal: "4%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "2%",
  },
  botao: {
    justifyContent: "center",
    width: tela * 0.4,
    height: tela * 0.15,
    padding: "2%",
    backgroundColor: "#F86E10",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginTop: "5%",
  },
  btnTexto: {
    textAlign: "center",
    fontSize: tela * 0.045,
    color: "#ffffff",
    fontFamily: fonts.bold,
  },
  FlatIng: {
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: "15%",
  },
  containerIng: {
    width: tela * 0.3,
    marginVertical: "3%",
    marginHorizontal: "1.5%",
    paddingBottom: "4%",
    alignItems: "center",
  },
  imagem: {
    width: tela * 0.22,
    height: tela * 0.22,
    borderRadius: 100,
    marginBottom: 10,
  },
  titulo: {
    fontFamily: fonts.semibold,
    color: "#7CB518",
    textAlign: "center",
  },
  tituloArray: {
    marginLeft: 5,
    fontFamily: fonts.semibold,
    color: "#7CB518",
    textAlign: "center",
  },
});
