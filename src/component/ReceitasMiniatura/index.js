import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const tela = Dimensions.get("window").width;

export default function ReceitasMiniatura({ data }) {
  const nomeReceita = data.nome;
  const imagem = data.imagem;
  const tempoPreparo = data.tempoPreparo;
  const navigation = useNavigation();

  function receitaEspecifica() {
    navigation.navigate("Receita", { data });
  }

  return (
    <TouchableOpacity style={styles.receitas} onPress={receitaEspecifica}>
      <Image
        source={{
          uri: imagem,
        }}
        style={styles.imagem}
      />
      <Text style={styles.titulo}>{nomeReceita}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="alarm"
          size={18}
          color="#F86E10"
          style={styles.icons}
        />
        <Text style={styles.desc}>{tempoPreparo}min</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  receitas: {
    width: tela * 0.455,
    marginVertical: "3%",
    marginHorizontal: "2%",
    paddingBottom: "4%",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  titulo: {
    fontFamily: fonts.semibold,
    textAlign: "center",
    color: "#F86E10",
    fontSize: tela * 0.04,
    marginVertical: 12,
    paddingHorizontal: 14,
  },
  desc: {
    fontFamily: fonts.medium,
    textAlign: "center",
    color: "#7CB518",
  },
  icons: {
    marginRight: 10,
  },
  imagem: {
    width: "100%",
    height: tela * 0.35,
  },
});
