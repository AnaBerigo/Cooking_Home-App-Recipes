import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import { AuthContext } from "../../contexts/auth";
const tela = Dimensions.get("window").width;
const telaH = Dimensions.get("window").height;

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ocultar, setOcultar] = useState(true);
  const { signIn } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoBranco.png")}
      >
        <TouchableOpacity
          style={styles.setaVoltar}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle"
            size={40}
            color="#F86E10"
          />
        </TouchableOpacity>
        <Text style={styles.textoInformativo}>
          Insira suas informações para realizar o seu login
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={3}
          style={styles.containerInformacoes}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.textoInput}>E-mail:</Text>
            <TextInput
              autoCorrect={true}
              value={email}
              keyboardType={"email-address"}
              textContentType={"emailAddress"}
              placeholder={"Digite seu e-mail"}
              onChangeText={(texto) => setEmail(texto)}
              style={styles.input}
            />
            <Text style={styles.textoInput}>Senha:</Text>
            <View style={styles.areaInputSenha}>
              <TextInput
                secureTextEntry={ocultar}
                textContentType={"password"}
                placeholder={"Digite sua senha"}
                value={password}
                onChangeText={(texto) => setPassword(texto)}
                style={styles.inputSenha}
              />
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => setOcultar(!ocultar)}
              >
                {ocultar ? (
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
            <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
              <Text style={styles.btnTextoEntrar}>Entrar</Text>
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
  textoInformativo: {
    alignSelf: "center",
    marginTop: "20%",
    marginHorizontal: tela * 0.1,
    marginBottom: "15%",
    fontFamily: fonts.bold,
    fontSize: tela * 0.055,
    color: "#333333",
  },
  containerInformacoes: {
    marginHorizontal: tela * 0.1,
    height: telaH * 0.7,
  },
  textoInput: {
    color: "#9F9F9F",
    fontSize: tela * 0.038,
    fontFamily: fonts.bold,
  },
  input: {
    color: "#333333",
    width: tela * 0.77,
    borderBottomColor: "#9F9F9F",
    height: tela * 0.1,
    borderBottomWidth: 1,
    fontSize: tela * 0.038,
    fontFamily: fonts.medium,
    marginBottom: "5%",
  },
  inputSenha: {
    width: tela * 0.7,
    color: "#333333",
    borderBottomColor: "#9F9F9F",
    borderBottomWidth: 1,
    fontSize: tela * 0.038,
    fontFamily: fonts.medium,
  },

  areaInputSenha: {
    flexDirection: "row",
    height: tela * 0.1,
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    width: tela * 0.1,
    borderBottomWidth: 1,
    borderBottomColor: "#9F9F9F",
  },
  areaInput: {
    flexDirection: "row",
    height: tela * 0.1,
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
  setaVoltar: {
    position: "absolute",
    left: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
