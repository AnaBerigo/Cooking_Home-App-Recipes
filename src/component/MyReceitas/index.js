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
    if (desc.length < 18) {
      return desc;
    }
    return `${desc.substring(0, 16)}...`;
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
      <View
        style={{
          //justifyContent: "center",
          marginLeft: "15%",
          flexDirection: "row",
          marginBottom: "5%",
        }}
      >
        <MaterialCommunityIcons
          name="alarm"
          size={18}
          color="#F86E10"
          style={styles.icons}
        />
        <Text style={styles.tempo}>{filterDesc(tempoPreparo)}</Text>
      </View>
      <View
        style={{
          marginBottom: "10%",
          marginLeft: "15%",
          flexDirection: "row",
        }}
      >
        <MaterialCommunityIcons
          name="calendar"
          size={18}
          color="#F86E10"
          style={styles.icons}
        />
        <Text style={styles.data}>{date}</Text>
      </View>

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
    width: tela * 0.455,
    marginVertical: "3%",
    marginHorizontal: "2%",
    paddingBottom: "4%",
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  titulo: {
    fontFamily: fonts.semibold,
    textAlign: "center",
    color: "#F86E10",
    fontSize: tela * 0.04,
    marginVertical: 12,
    paddingHorizontal: 14,
  },
  icons: {
    marginRight: "10%",
  },
  tempo: {
    fontFamily: fonts.semibold,
    textAlign: "center",
    color: "#7CB518",
    fontSize: tela * 0.035,
  },
  data: {
    fontFamily: fonts.medium,
    textAlign: "center",
    color: "#7CB518",
    fontSize: tela * 0.035,
  },
  iconeLixo: {
    position: "absolute",
    right: 3,
    bottom: 3,
    zIndex: 10,
  },
  imagem: {
    alignSelf: "center",
    width: "80%",
    height: tela * 0.35,
    borderRadius: 100,
  },
});
