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
import firebase from "../../service/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import IconMenu from "../../component/IconMenu";
import { format } from "date-fns";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
const tela = Dimensions.get("window").width;

export default function CriarReceita() {
  const navigation = useNavigation();
  const imagem =
    "https://user-images.githubusercontent.com/74029212/142089632-d8baef95-e4eb-4cec-92c5-1b202749e67e.png";
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
          <IconMenu />
          <ScrollView>
            <TouchableOpacity
              style={styles.btnCamera}
              onPress={imagePickerCall}
            >
              <Image
                source={{
                  uri: avatar
                    ? avatar.uri
                    : "https://user-images.githubusercontent.com/74029212/142089632-d8baef95-e4eb-4cec-92c5-1b202749e67e.png",
                }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.containerReceitas}>
              <Text style={styles.titulo}>Criar Receita</Text>
              <TextInput
                placeholder={"Nome da receita"}
                autoCorrect={true}
                value={nomeReceita}
                onChangeText={(text) => setNomeReceita(text)}
                style={styles.inputPequeno}
              />
              <TextInput
                placeholder={"Ingredientes"}
                multiline={true}
                autoCorrect={true}
                value={ingredientes}
                numberOfLines={7}
                onChangeText={(text) => setIngredientes(text)}
                style={styles.inputGrande}
              />
              <TextInput
                placeholder={"Modo de preparo"}
                multiline={true}
                autoCorrect={true}
                value={modoPreparo}
                numberOfLines={7}
                onChangeText={(text) => setModoPreparo(text)}
                style={styles.inputGrande}
              />
              <TextInput
                placeholder={"Tempo de preparo"}
                autoCorrect={true}
                value={tempoPreparo}
                onChangeText={(text) => setTempoPreparo(text)}
                style={styles.inputPequeno}
              />
              <TouchableOpacity
                style={styles.botaoCadastrar}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTextoCadastrar}>Finalizar Receita</Text>
              </TouchableOpacity>
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
  },
  containerReceitas: {
    flex: 1,
    marginTop: "10%",
    margin: 10,
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  titulo: {
    fontSize: tela * 0.07,
    marginTop: "10%",
    marginBottom: "10%",
    fontFamily: fonts.bold,
    color: "#F86E10",
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
    width: tela * 0.5,
  },
  inputPequeno: {
    borderRadius: 5,
    marginTop: "7%",
    borderColor: "#F86E10",
    borderWidth: 1.5,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.medium,
    width: tela * 0.85,
    height: 50,
    color: "#F86E10",
    paddingHorizontal: 10,
  },
  inputGrande: {
    marginTop: "7%",
    borderRadius: 5,
    borderColor: "#F86E10",
    borderWidth: 1.5,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    fontFamily: fonts.medium,
    width: tela * 0.85,
    height: 80,
    color: "#F86E10",
    paddingHorizontal: 10,
  },
  btnCamera: {
    position: "absolute",
    top: "7%",
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
  avatar: {
    marginTop: "10%",
    marginLeft: "10%",
    width: tela * 0.23,
    height: tela * 0.23,
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
    marginTop: "10%",
    marginBottom: "20%",
  },
  btnTextoCadastrar: {
    textAlign: "center",
    fontSize: tela * 0.045,
    color: "#ffffff",
    fontFamily: fonts.bold,
  },
});
