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
        <View style={styles.viewTextoInformativo}>
          <Text style={styles.textoInformativo}>
            Insira suas informações para realizar o seu login
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={3}
          style={styles.containerInformacoes}
        >
          <ScrollView vertical showsVerticalScrollIndicator={false}>
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
            <View style={styles.areaInput}>
              <TextInput
                secureTextEntry={ocultar}
                textContentType={"password"}
                placeholder={"Digite sua senha"}
                value={password}
                onChangeText={(texto) => setPassword(texto)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setOcultar(!ocultar)}
              >
                {ocultar ? (
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
            <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
              <View style={styles.btnAreaEntrar}>
                <Text style={styles.btnTextoEntrar}>Entrar</Text>
              </View>
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
  viewTextoInformativo: {
    marginTop: "20%",
    marginHorizontal: "5%",
    marginBottom: "14%",
  },
  textoInformativo: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: "#333333",
  },
  containerInformacoes: {
    marginLeft: "10%",
    marginTop: "10%",
  },
  textoInput: {
    color: "#9F9F9F",
    fontSize: 16,
    fontFamily: fonts.bold,
  },
  areaInput: {
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
  botaoEntrar: {
    marginTop: "20%",
    alignItems: "center",
    width: tela * 0.8,
    height: tela * 0.15,
    borderWidth: 2,
    backgroundColor: "#F86E10",
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
    color: "#fff",
  },
  setaVoltar: {
    position: "absolute",
    left: 10,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 50,
    zIndex: 10,
  },
});
