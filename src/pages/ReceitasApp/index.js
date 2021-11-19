import React, { useState, useEffect } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import Header from "../../component/Header";
import { receitas } from "../../service/receitas";
import ReceitasMiniatura from "../../component/ReceitasMiniatura";
const tela = Dimensions.get("window").width;

export default function ReceitasApp() {
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
          <TextInput
            placeholder={"O que deseja pesquisar?"}
            autoCorrect={true}
            textContentType={"name"}
            value={pesquisa}
            onChangeText={(texto) => setPesquisa(texto)}
            style={styles.pesquisa}
          />
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
    alignSelf: "center",
    width: tela * 0.85,
    height: tela * 0.13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F86E10",
    marginVertical: "3%",
    paddingHorizontal: "3%",
    fontSize: tela * 0.045,
    fontFamily: fonts.medium,
    color: "#333333",
  },
});
