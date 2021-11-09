import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation, Header } from "@react-navigation/native";
import firebase from "../../service/firebaseConnection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import HeaderSenha from "../../component/HeaderSenha";
import { ScrollView } from "react-native-gesture-handler";

export default function trocarSenha() {
  const [ocultar1, setOcultar1] = useState(true);
  const [ocultar2, setOcultar2] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmarNewPassword, setConfirmarNewPassword] = useState("");
  const user = firebase.auth().currentUser;
  const navigation = useNavigation();

  console.log(newPassword);

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
          <ScrollView vertical showsVerticalScrollIndicator={false}>
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
                    size={25}
                    color="#F86E10"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={25}
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
                    size={25}
                    color="#F86E10"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={25}
                    color="#F86E10"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.botaoEntrar}
                onPress={handleSubmit}
              >
                <View style={styles.btnAreaEntrar}>
                  <Text style={styles.btnTextoEntrar}>Alterar Senha</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  textoInput: {
    marginTop: "10%",
    color: "#9F9F9F",
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  containerInformacoes: {
    marginTop: "10%",
    marginLeft: "10%",
  },
  areaInput: {
    marginTop: "2%",
    flexDirection: "row",
    width: "90%",
    borderRadius: 8,
    height: 50,
  },
  input: {
    width: "85%",
    color: "#333333",
    borderBottomColor: "#9F9F9F",
    height: 50,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: fonts.medium,
    marginBottom: "10%",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: "12%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#9F9F9F",
  },
  btnView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "23%",
  },
  botaoEntrar: {
    marginRight: "14%",
    width: "85%",
    height: 56,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "#F86E10",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  btnAreaEntrar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextoEntrar: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: "#F86E10",
  },
});
