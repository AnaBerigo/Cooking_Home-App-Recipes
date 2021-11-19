import React, { useState, useContext, useEffect, Children } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Header from "../../component/Header";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../service/firebaseConnection";
import MyReceitas from "../../component/MyReceitas";

export default function MinhasReceitas() {
  const [rec, setRec] = useState([]);
  const { user } = useContext(AuthContext);
  const [receitas, setReceitas] = useState(0);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("users")
        .child(uid)
        .on("value", (snapshot) => {
          setReceitas(snapshot.val().receitas);
        });
    }
    loadList();
  }, []);

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("receitas")
        .child(uid)
        .orderByChild("date")
        .on("value", (snapshot) => {
          setRec([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              nomeReceita: childItem.val().nomeReceita,
              ingredientes: childItem.val().ingredientes,
              modoPreparo: childItem.val().modoPreparo,
              nomeUsuario: childItem.val().nomeUsuario,
              imagemReceita: childItem.val().imagemReceita,
              tempoPreparo: childItem.val().tempoPreparo,
              date: childItem.val().date,
            };
            setRec((oldArray) => [...oldArray, list]);
          });
        });
    }
    loadList();
  }, []);

  function handleDelete(data) {
    Alert.alert(
      "Cuidado Atenção",
      `Você realmente deseja excluir a receita " ${data.nomeReceita} "?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleDeleteSucess(data),
        },
      ]
    );
  }

  async function handleDeleteSucess(data) {
    await firebase
      .database()
      .ref("receitas")
      .child(uid)
      .child(data.key)
      .remove();

    await firebase
      .database()
      .ref("users")
      .child(uid)
      .once("value")
      .then((snapshot) => {
        let receitas = parseInt(snapshot.val().receitas);
        receitas -= 1;
        user.child("receitas").set(receitas);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imgFundo}
        source={require("../../img/FundoFolha.png")}
      >
        <Header />
        <ScrollView style={styles.containerReceitas}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={rec}
            numColumns={2}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <MyReceitas data={item} deleteItem={handleDelete} />
            )}
          />
        </ScrollView>
      </ImageBackground>
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
});
