import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function MyReceitas({ data, deleteItem }) {
  const navigation = useNavigation();
  const modoPreparo = data.modoPreparo;
  const tempoPreparo = data.tempoPreparo;
  const imagemReceita = data.imagemReceita;
  const nomeReceita = data.nomeReceita;
  const ingredientes = data.ingredientes;
  const date = data.date;
  const nomeUsuario = data.nomeUsuario;

  function receitaEspecifica() {
    navigation.navigate("ReceitasSalvas", { data });
  }

  function filterDesc(desc) {
    if (desc.length < 20) {
      return desc;
    }
    return `${desc.substring(0, 18)}...`;
  }

  return (
    <TouchableOpacity style={styles.receitas} onPress={receitaEspecifica}>
      <Image
        source={{
          uri: imagemReceita
            ? imagemReceita
            : "https://user-images.githubusercontent.com/74029212/138168360-ba1b0f19-ac68-42cb-b4cc-3cd926b9976c.png",
        }}
        style={styles.imagem}
      />
      <Text style={styles.titulo}>{filterDesc(nomeReceita)}</Text>
      <Text style={styles.titulo}>{tempoPreparo}</Text>
      <Text style={styles.desc}>{date}</Text>
      <TouchableOpacity
        onPress={() => deleteItem(data)}
        style={styles.iconeLixo}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={25}
          color="#F86E10"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  receitas: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  titulo: {
    fontFamily: fonts.semibold,
    color: "#F86E10",
    fontSize: 18,
    marginBottom: 8,
  },
  desc: {
    fontFamily: fonts.medium,
    color: "#F86E10",
  },
  iconeLixo: {
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  imagem: {
    width: "100%",
    height: tela * 0.35,
  },
});
