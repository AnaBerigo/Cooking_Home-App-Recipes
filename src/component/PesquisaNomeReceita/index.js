import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Text,
  Image,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import Header from "../../component/Header";
import { getReceitasPorNome } from "../../service/api";
import { receitas } from "../../service/receitas";
import ReceitasMiniatura from "../../component/ReceitasMiniatura";
const tela = Dimensions.get("window").width;

export default function Pesquisa() {
  const [pesquisa, setPesquisa] = useState("");
  const [list, setList] = useState(receitas);

  useEffect(() => {
    if (pesquisa === "") {
      setList(receitas);
    } else {
      setList(
        receitas.filter(
          (item) => item.nome.toLowerCase().indexOf(pesquisa.toLowerCase()) > -1
        )
      );
    }
  }, [pesquisa]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ImageBackground
          style={styles.imgFundo}
          source={require("../../img/FundoFolha.png")}
        >
          <Header />
          <View style={styles.pesquisa}>
            <TextInput
              placeholder={"O que deseja pesquisar?"}
              autoCorrect={true}
              textContentType={"name"}
              value={pesquisa}
              onChangeText={(texto) => setPesquisa(texto)}
              style={styles.input}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={(item) => String(item.receitaId)}
            data={list}
            renderItem={({ item }) => <ReceitasMiniatura data={item} />}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  pesquisa: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    width: "90%",
    borderRadius: 10,
    height: 50,
    borderWidth: 2,
    borderColor: "#F86E10",
    marginHorizontal: "5%",
    marginVertical: "3%",
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.medium,
    width: "85%",
    height: 50,
    color: "#333333",
  },
});
