import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Keyboard,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import fonts from "../../assets/fonts/fonts";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../../service/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import Header from "../../component/Header";
import { format } from "date-fns";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
const tela = Dimensions.get("window").width;

export default function CriarReceita() {
  const navigation = useNavigation();
  const imagem =
    "https://user-images.githubusercontent.com/74029212/138168360-ba1b0f19-ac68-42cb-b4cc-3cd926b9976c.png";
  const [ingredientes, setIngredientes] = useState("");
  const [avatar, setAvatar] = useState();
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [nomeReceita, setNomeReceita] = useState("");
  const { user: usuario } = useContext(AuthContext);

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, //all é o tipo de midia que ele esta selecionando
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  function handleSubmit() {
    Keyboard.dismiss();
    if (
      nomeReceita === "" ||
      ingredientes === "" ||
      modoPreparo === "" ||
      tempoPreparo === ""
    ) {
      alert("Insira as informações da receita.");
      return;
    }
    Alert.alert(
      "Confirmando dados",
      `Nome receita: ${nomeReceita} \nIngredientes: ${ingredientes} \nModo de preparo: ${modoPreparo} \nTempo de Preparo: ${tempoPreparo}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleCriarReceita(),
        },
      ]
    );
  }

  async function handleCriarReceita() {
    let uid = usuario.uid;
    let key = await firebase.database().ref("receitas").child(uid).push().key;

    console.log(imagem);
    //cadastrei a receita no banco de dados
    await firebase
      .database()
      .ref("receitas")
      .child(uid)
      .child(key)
      .set({
        nomeReceita: nomeReceita,
        ingredientes: ingredientes,
        modoPreparo: modoPreparo,
        nomeUsuario: usuario.nome,
        imagemReceita: avatar ? avatar.uri : imagem,
        tempoPreparo: tempoPreparo,
        date: format(new Date(), "dd/MM/yy"),
      });

    //atualizar a quantidade de receitas no perfil do usuario
    let user = firebase.database().ref("users").child(uid);
    await user.once("value").then((snapshot) => {
      let receitas = parseInt(snapshot.val().receitas);
      receitas += 1;
      user.child("receitas").set(receitas);
    });

    Keyboard.dismiss();
    setIngredientes(" ");
    setModoPreparo(" ");
    setTempoPreparo(" ");
    setAvatar();
    setNomeReceita(" ");
    navigation.navigate("MinhasReceitas");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ImageBackground
          style={styles.imgFundo}
          source={require("../../img/FundoFolha.png")}
        >
          <Header />
          <ScrollView>
            <TouchableOpacity
              style={styles.btnCamera}
              onPress={imagePickerCall}
            >
              <Image
                source={{
                  uri: avatar
                    ? avatar.uri
                    : "https://user-images.githubusercontent.com/74029212/138168360-ba1b0f19-ac68-42cb-b4cc-3cd926b9976c.png",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.containerReceitas}>
              <View style={styles.viewIngredientes}>
                <Text style={styles.textIngredientes}>NOME DA RECEITA</Text>
              </View>
              <TextInput
                autoCorrect={true}
                value={nomeReceita}
                onChangeText={(text) => setNomeReceita(text)}
                style={styles.inputPequeno}
              />
              <View style={styles.viewIngredientes}>
                <Text style={styles.textIngredientes}>INGREDIENTES</Text>
              </View>
              <TextInput
                multiline={true}
                autoCorrect={true}
                value={ingredientes}
                numberOfLines={7}
                onChangeText={(text) => setIngredientes(text)}
                style={styles.inputGrande}
              />

              <View style={styles.viewIngredientes}>
                <Text style={styles.textIngredientes}>MODO DE PREPARO</Text>
              </View>
              <TextInput
                multiline={true}
                autoCorrect={true}
                value={modoPreparo}
                numberOfLines={7}
                onChangeText={(text) => setModoPreparo(text)}
                style={styles.inputGrande}
              />
              <View style={styles.viewIngredientes}>
                <Text style={styles.textIngredientes}>TEMPO DE PREPARO</Text>
              </View>
              <TextInput
                autoCorrect={true}
                value={tempoPreparo}
                onChangeText={(text) => setTempoPreparo(text)}
                style={styles.inputPequeno}
              />
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.botaoCadastrar}
                  onPress={handleSubmit}
                >
                  <View style={styles.btnAreaCadastrar}>
                    <Text style={styles.btnTextoCadastrar}>
                      Finalizar Receita
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
    zIndex: 1,
  },
  containerReceitas: {
    flex: 1,
    marginTop: "10%",
    margin: 10,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  viewIngredientes: {
    backgroundColor: "#7CB518",
    marginTop: "7%",
    width: 190,
    height: 50,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textIngredientes: {
    color: "#ffffff",
    fontFamily: fonts.bold,
    textAlign: "center",
    fontSize: 17,
  },
  inputPequeno: {
    borderRadius: 5,
    marginTop: "7%",
    marginLeft: "8%",
    borderColor: "#F86E10",
    borderWidth: 1.5,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.medium,
    width: "85%",
    height: 50,
    color: "#F86E10",
    paddingHorizontal: 10,
  },
  inputGrande: {
    marginTop: "7%",
    marginLeft: "8%",
    borderRadius: 5,
    borderColor: "#F86E10",
    borderWidth: 1.5,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.medium,
    width: "85%",
    height: 80,
    color: "#F86E10",
    paddingHorizontal: 10,
  },
  camera: {
    flex: 1,
  },
  btnCamera: {
    position: "absolute",
    top: "2%",
    right: "6%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: tela * 0.3,
    height: tela * 0.3,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#F86E10",
    borderRadius: 10,
    zIndex: 1,
  },
  cameraTexto: {
    fontSize: 18,
    color: "#95C346",
    fontFamily: fonts.bold,
  },
  avatar: {
    width: tela * 0.28,
    height: tela * 0.28,
    borderRadius: 5,
  },
  btnView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginBottom: "10%",
  },
  botaoCadastrar: {
    width: "85%",
    height: 56,
    borderWidth: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderColor: "#F86E10",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },
  btnAreaCadastrar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextoCadastrar: {
    fontSize: 18,
    color: "#F86E10",
    fontFamily: fonts.bold,
  },
});
