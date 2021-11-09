import React, { useState, createContext, useEffect } from "react";
import firebase from "../service/firebaseConnection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("Auth_user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  //Função para logar o usuário
  async function signIn(email, password) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref("users")
          .child(uid)
          .once("value")
          .then((snapshot) => {
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              sexo: snapshot.val().sexo,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          });
      })
      .catch((error) => {
        alert(error.code);
      });
  }

  //Cadastrando o usuário
  async function signUp(email, password, nome, sexoSelecionado) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await firebase
          .database()
          .ref("users")
          .child(uid)
          .set({
            receitas: 0,
            nome: nome,
            sexo: sexoSelecionado,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              sexo: sexoSelecionado,
              email: value.user.email,
            };
            setUser(data);
            storageUser(data);
          })
          .catch((error) => {
            alert(error.code);
          });
      });
  }

  //Salvar os dados no AsyncStorage
  const storageUser = async (data) => {
    await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
  };

  //Deslogar o usuário
  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
