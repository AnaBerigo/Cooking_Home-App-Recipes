import React, { useState, useContext, useEffect } from "react";
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
  TextInput,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import { getArraysIngredientes } from "../../service/api";
import { ingredientes } from "../../service/receitas";
import { useNavigation } from "@react-navigation/native";
import IconMenu from "../../component/IconMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function Ingredientes() {
  const navigation = useNavigation();

  /*  const renderIngredient = ({ item }) => (
    <TouchableOpacity
      style={styles.containerIng}
      onPress={() => navigation.navigate("IngredienteEspecifico", { item })}
    >
      <Image style={styles.imagem} source={{ uri: item.imagem }} />
      <Text style={styles.titulo}>{item.nome}</Text>
    </TouchableOpacity>
  );*/

  const renderIngredient = ({ item }) => (
    <TouchableOpacity
      style={styles.containerIng}
      onPress={() => inserirItem(item)}
    >
      <Image style={styles.imagem} source={{ uri: item.imagem }} />
      <Text style={styles.titulo}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const renderArrayIngredient = ({ item }) => (
    <View style={styles.containerArrayIng}>
      <MaterialCommunityIcons
        name="checkbox-marked-outline"
        size={25}
        color="#F86E10"
      />
      <Text style={styles.tituloArray}>{item.nome}</Text>
    </View>
  );

  function inserirItem(item) {
    if (newItem.includes(item)) {
      newItem.splice(newItem.indexOf(item), 1);
    } else {
      setNewItem((oldArray) => [...oldArray, item]);
    }

    /*newItem.filter((data, i) => {
      console.log("entrei");
      newItem.indexOf(data) === i;
    });

    newItem.find(() => {
      console.log("entrei1");
      if (newItem != null) {
        newItem = (oldArray) => [...oldArray, item];
      }
    });

     if (ingredienteId === item.ingredienteId) {
      return;
    } else {
      setIngID((oldArray) => [...oldArray, item.ingredienteId]);
      setNewItem((oldArray) => [...oldArray, item]);
    }

    newItem.forEach((i) => {
      if (i == null || i.ingredienteId != item.ingredienteId) {
        setNewItem((oldArray) => [...oldArray, item]);
      } else {
        newItem.splice(i.ingredienteId, 1);
      }
    });*/

    //setNewItem((oldArray) => [...oldArray, item]);

    console.log(newItem);
  }
  const [newItem, setNewItem] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [list, setList] = useState(ingredientes);

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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View>
          <IconMenu />

          <View style={styles.pesquisa}>
            <TextInput
              placeholder={"Qual(is) ingrediente(s) deseja?"}
              autoCorrect={true}
              textContentType={"name"}
              value={pesquisa}
              onChangeText={(texto) => setPesquisa(texto)}
              style={styles.input}
            />
          </View>
          <View style={styles.ArrayIng}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={newItem}
              renderItem={renderArrayIngredient}
              keyExtractor={(item) => String(item.ingredienteId)}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("IngredienteEspecifico", newItem)
              }
              style={styles.botao}
            >
              {console.log(newItem)}
              <Text style={styles.btnTexto}>Mostrar Receitas</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.FlatIng}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={list}
            renderItem={renderIngredient}
            keyExtractor={(item) => String(item.ingredienteId)}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(124, 181, 24, 0.15)",
    flex: 1,
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  ArrayIng: {
    marginBottom: "3%",
    marginHorizontal: "5%",
    paddingVertical: "2%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    borderColor: "#F86E10",
    borderWidth: 2,
  },
  botao: {
    alignSelf: "center",
    justifyContent: "center",
    width: tela * 0.7,
    height: tela * 0.15,
    backgroundColor: "#F86E10",
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    marginTop: "1%",
  },
  btnTexto: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontFamily: fonts.bold,
  },
  FlatIng: {
    borderRadius: 55,
    marginHorizontal: "2%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginBottom: "3%",
    paddingVertical: "2%",
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
  imagem: {
    width: tela * 0.22,
    height: tela * 0.22,
    borderRadius: 100,
    marginBottom: 10,
  },
  containerIng: {
    flex: 1,
    alignItems: "center",
    margin: 12,
  },
  containerArrayIng: {
    flex: 1,
    alignItems: "center",
    margin: 6,
    flexDirection: "row",
  },
  pesquisa: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    width: tela * 0.8,
    borderRadius: 10,
    height: 50,
    borderWidth: 2,
    borderColor: "#F86E10",
    marginLeft: "15%",
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
