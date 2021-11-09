import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import Header from "../../component/Header";
import { receitas } from "../../service/receitas";
import ReceitasMiniatura from "../../component/ReceitasMiniatura";
import firebase from "../../service/firebaseConnection";
import { AuthContext } from "../../contexts/auth";

export default function Favoritos(props) {
  console.log(props);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ImageBackground
          style={styles.imgFundo}
          source={require("../../img/FundoFolha.png")}
        >
          <Header />
          <View style={styles.containerFav}>
            <ScrollView>
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => String(item.receitaId)}
                data={receitas}
                renderItem={({ item }) => <ReceitasMiniatura data={item} />}
              />
            </ScrollView>
          </View>
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
  containerFav: {},
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
});
