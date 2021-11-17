import React, { useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import { AuthContext } from "../../contexts/auth";
import { Picker } from "@react-native-picker/picker";
const tela = Dimensions.get("window").width;
const telaH = Dimensions.get("window").height;

export default function SignUp() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ocultar, setOcultar] = useState(true);
  const [sexoSelecionado, setSexoSelecionado] = useState("");

  const { signUp } = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (
      nome === "" ||
      email === "" ||
      password === "" ||
      sexoSelecionado === ""
    ) {
      alert("Insira as informações para o cadastro.");
      return;
    }
    Alert.alert(
      "Confirmando dados",
      `Nome: ${nome} \nE-mail: ${email} \nSenha: ${password}\nSexo: ${
        sexoSelecionado === "m"
          ? "Masculino"
          : sexoSelecionado === "n"
          ? "Não Especificado"
          : "Feminino"
      }`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleSignUp(),
        },
      ]
    );
  }

  function handleSignUp() {
    signUp(email, password, nome, sexoSelecionado);
    alert("Seu cadastro foi efetuado com sucesso.");
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
          Insira suas informações para efetuar o seu cadastro
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={styles.containerInformacoes}
          >
            <Text style={styles.textoInput}>Nome:</Text>
            <TextInput
              placeholder={"Digite seu nome"}
              autoCorrect={true}
              textContentType={"name"}
              value={nome}
              onChangeText={(texto) => setNome(texto)}
              style={styles.input}
            />
            <Text style={styles.textoInput}>E-mail:</Text>
            <TextInput
              autoCorrect={true}
              keyboardType={"email-address"}
              textContentType={"emailAddress"}
              placeholder={"Digite seu e-mail"}
              value={email}
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
                KeyboardAvoidingView={true}
                onChangeText={(texto) => setPassword(texto)}
                style={styles.inputSenha}
              />
              <View style={styles.iconView}>
                <TouchableOpacity onPress={() => setOcultar(!ocultar)}>
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
            </View>
            <Text style={styles.textoSexo}>Selecione o sexo:</Text>
            <Picker
              style={styles.picker}
              selectedValue={sexoSelecionado}
              onValueChange={(itemValue, itemIndex) =>
                setSexoSelecionado(itemValue)
              }
            >
              <Picker.Item label="Feminino" value="f" />
              <Picker.Item label="Masculino" value="m" />
              <Picker.Item label="Prefiro não dizer" value="n" />
            </Picker>

            <TouchableOpacity
              style={styles.botaoCadastrar}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTextoCadastrar}>Finalizar Cadastro</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
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
    marginBottom: "10%",
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
  areaInputSenha: {
    flexDirection: "row",
    height: tela * 0.1,
  },
  inputSenha: {
    width: tela * 0.7,
    color: "#333333",
    borderBottomColor: "#9F9F9F",
    borderBottomWidth: 1,
    fontSize: tela * 0.038,
    fontFamily: fonts.medium,
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#9F9F9F",
  },
  textoSexo: {
    marginTop: 20,
    color: "#9F9F9F",
    fontSize: tela * 0.038,
    fontFamily: fonts.bold,
  },
  picker: {
    width: tela * 0.8,
    height: Platform.OS == "ios" ? tela * 0.38 : tela * 0.1,
    marginTop: Platform.OS == "ios" ? tela * -0.05 : tela * 0.02,
    marginBottom: Platform.OS == "ios" ? tela * 0.05 : tela * 0.1,
    color: "#333333",
    alignSelf: "center",
  },
  botaoCadastrar: {
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
    marginBottom: "7%",
    marginBottom: "20%",
  },
  btnTextoCadastrar: {
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
