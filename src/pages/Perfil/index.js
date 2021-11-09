import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import { AuthContext } from "../../contexts/auth";
import HeaderPerfil from "../../component/HeaderPerfil";
import firebase from "../../service/firebaseConnection";
import { useNavigation } from "@react-navigation/native";

export default function Perfil() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  function trocarSenha() {
    navigation.navigate("TrocarSenha");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoBranco.png")}
      >
        <HeaderPerfil />
        <View style={styles.viewTextoInformativo}>
          <Text style={styles.textoInformativo}>{user && user.nome}</Text>
        </View>
        <View style={styles.viewInfo}>
          <View style={styles.espacamento}>
            <Text style={styles.textos}>Nome:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textos1}>{user && user.nome}</Text>
            </View>
          </View>
          <View style={styles.espacamento}>
            <Text style={styles.textos}>E-mail:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textos1}>{user && user.email}</Text>
            </View>
          </View>
          <View style={styles.espacamento}>
            <Text style={styles.textos}>Senha:</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textos1}>********</Text>
              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={trocarSenha}
              >
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color="#FA8927"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textos1}>Sair da minha conta</Text>
            <TouchableOpacity style={styles.botaoEditar} onPress={signOut}>
              <MaterialCommunityIcons
                name="exit-to-app"
                size={25}
                color="#FA8927"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  viewTextoInformativo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  textoInformativo: {
    fontFamily: fonts.bold,
    fontSize: 27,
    color: "#333333",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
  avatarPencil: {
    position: "absolute",
    left: 100,
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    zIndex: 10,
    borderRadius: 40,
    backgroundColor: "#FA8927",
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.medium,
    width: "85%",
    height: 50,
    color: "#333333",
  },
  iconeMenu: {
    position: "absolute",
    left: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: 35,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    zIndex: 10,
  },
  botaoEditar: {
    position: "absolute",
    right: 5,
  },
  viewInfo: {
    flex: 3,
    marginHorizontal: "5%",
  },
  espacamento: {
    marginBottom: "5%",
  },
  textos: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "#8E908A",
  },
  textos1: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: "#333333",
  },
});

//editar senha

//<TouchableOpacity style={styles.botaoEditar}>
//<MaterialCommunityIcons
//name="pencil"
//size={25}
//color="#FA8927"
///>
//</TouchableOpacity>
