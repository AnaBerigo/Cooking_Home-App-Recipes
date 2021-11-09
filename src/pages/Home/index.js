import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "../../component/Header";
import { receitas } from "../../service/receitas";
import ReceitasMiniatura from "../../component/ReceitasMiniatura";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ImageBackground
          style={styles.imgFundo}
          source={require("../../img/FundoFolha.png")}
        >
          <Header />
          <ScrollView>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item) => String(item.receitaId)}
                data={receitas}
                renderItem={({ item }) => <ReceitasMiniatura data={item} />}
              />
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imgFundo: {
    flex: 1,
    resizeMode: "cover",
  },
});
