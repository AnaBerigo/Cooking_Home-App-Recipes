import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import fonts from "../assets/fonts/fonts";

import Perfil from "../pages/Perfil";
import CriarReceita from "../pages/CriarReceita";
import Ingredientes from "../pages/Ingredientes";
import MinhasReceitas from "../pages/MinhasReceitas";
import { createStackNavigator } from "@react-navigation/stack";
import TrocarSenha from "../pages/TrocarSenha";
import Receita from "../pages/Receita";
import IngredienteEspecifico from "../pages/IngredienteEspecifico";
import ReceitasApp from "../pages/ReceitasApp";
import UploadCamera from "../component/UploadCamera";
import ReceitasSalvas from "../pages/ReceitasSalvas";

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

function Drawers() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#7CB518",
        drawerActiveTintColor: "#FFFFFF",
        drawerInactiveTintColor: "#7CB518",
        drawerLabelStyle: { fontFamily: fonts.bold, fontSize: 16 },
      }}
      initialRouteName="ReceitasApp"
    >
      <AppDrawer.Screen
        name="Perfil"
        component={Perfil}
        options={{
          title: "Perfil",
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="ReceitasApp"
        component={ReceitasApp}
        options={{
          title: "Receitas",
          headerShown: false,
        }}
      />

      <AppDrawer.Screen
        name="Ingredientes"
        component={Ingredientes}
        options={{
          title: "Filtrar Ingredientes",
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="CriarReceita"
        component={CriarReceita}
        options={{
          title: "Criar Receita",
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="MinhasReceitas"
        component={MinhasReceitas}
        options={{
          title: "Minhas Receitas",
          headerShown: false,
        }}
      />
    </AppDrawer.Navigator>
  );
}

export default function AppRoutes() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Drawers"
        component={Drawers}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Receita"
        component={Receita}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AppDrawer.Screen
        name="MinhasReceitas"
        component={MinhasReceitas}
        options={{
          title: "Minhas Receitas",
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="UploadCamera"
        component={UploadCamera}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ReceitasSalvas"
        component={ReceitasSalvas}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="IngredienteEspecifico"
        component={IngredienteEspecifico}
        options={{
          title: "",
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="TrocarSenha"
        component={TrocarSenha}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
}
