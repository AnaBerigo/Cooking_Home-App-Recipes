import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Keyboard,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation, Header } from "@react-navigation/native";
import firebase from "../../service/firebaseConnection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import HeaderSenha from "../../component/HeaderSenha";
const tela = Dimensions.get("window").width;
const telaH = Dimensions.get("window").height;

export default function trocarSenha() {
  const [ocultar1, setOcultar1] = useState(true);
  const [ocultar2, setOcultar2] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmarNewPassword, setConfirmarNewPassword] = useState("");
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  function handleSubmit() {
    Keyboard.dismiss();
    if (newPassword === "" || confirmarNewPassword === "") {
      alert("Preencha todos os campos.");
      return;
    } else if (newPassword != confirmarNewPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    Alert.alert("Confirmando dados", `Nova senha: ${newPassword}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Continuar",
        onPress: () => NovaSenha(),
      },
    ]);
  }

  function NovaSenha() {
    user.updatePassword(newPassword).catch((error) => {
      alert(error);
      console.log(error);
    });
    alert("Senha alterada com sucesso!");
    Keyboard.dismiss();
    setNewPassword("");
    setConfirmarNewPassword("");
    navigation.navigate("Perfil");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoBranco.png")}
      >
        <HeaderSenha />

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={50}
          style={styles.containerInformacoes}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textoInput}>Nova Senha:</Text>
            <View style={styles.areaInput}>
              <TextInput
                secureTextEntry={ocultar1}
                textContentType={"password"}
                placeholder={"Digite a nova senha"}
                value={newPassword}
                onChangeText={(texto) => setNewPassword(texto)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setOcultar1(!ocultar1)}
              >
                {ocultar1 ? (
                  <MaterialCommunityIcons
                    name="eye"
                    size={tela * 0.06}
                    color="#F86E10"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={tela * 0.06}
                    color="#F86E10"
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.textoInput}>Confirmar Senha:</Text>
            <View style={styles.areaInput}>
              <TextInput
                secureTextEntry={ocultar2}
                textContentType={"password"}
                placeholder={"Digite a nova senha novamente"}
                value={confirmarNewPassword}
                onChangeText={(texto) => setConfirmarNewPassword(texto)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setOcultar2(!ocultar2)}
              >
                {ocultar2 ? (
                  <MaterialCommunityIcons
                    name="eye"
                    size={tela * 0.06}
                    color="#F86E10"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={tela * 0.06}
                    color="#F86E10"
                  />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.botaoEntrar} onPress={handleSubmit}>
              <Text style={styles.btnTextoEntrar}>Alterar Senha</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
  containerInformacoes: {
    marginTop: "20%",
    marginHorizontal: tela * 0.1,
    height: telaH * 0.7,
  },
  textoInput: {
    marginTop: "10%",
    color: "#9F9F9F",
    fontSize: tela * 0.038,
    fontFamily: fonts.bold,
  },
  input: {
    width: tela * 0.7,
    height: tela * 0.12,
    color: "#333333",
    borderBottomColor: "#9F9F9F",
    borderBottomWidth: 1,
    fontSize: tela * 0.038,
    fontFamily: fonts.medium,
  },
  areaInput: {
    flexDirection: "row",
    //height: tela * 0.11,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: tela * 0.11,
    height: tela * 0.12,
    borderBottomWidth: 1,
    borderBottomColor: "#9F9F9F",
  },
  botaoEntrar: {
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
    marginTop: "20%",
    marginBottom: "20%",
  },
  btnTextoEntrar: {
    textAlign: "center",
    fontSize: tela * 0.045,
    color: "#ffffff",
    fontFamily: fonts.bold,
  },
});
